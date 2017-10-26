const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const List = mongoose.model('List');
const Recipient = mongoose.model('Recipient');

module.exports = app => {

  app.get('/api/lists', requireLogin, async (req, res) => {
    const {_id} = req.user;
    let lists = await List.find({_user: _id}).populate('_recipients').exec();
    if (!lists) {
      res.send('no lists yet...');
    } else {
      res.send(lists);
    }
  });

  app.post('/api/lists', requireLogin, async (req, res) => {
    console.log(req.body);
    const {name, description} = req.body;

    //TODO validate
    list = new List({
      _user: req.user._id,
      name, 
      description
    });

    try {
      await list.save();
      res.send(list);
    } catch(err) {
      console.log('save list err', err);
      res.status(500).send(err);
    }
  });

  app.get('/api/lists/:id', requireLogin, async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    try {
      let list = await List.findOne({
        _id: id, 
        _user: _id
      })
      .populate('_recipients')
      .exec();
      console.log('list', list);
      if (!list) {
        return res.send('no list found!');
      }
      res.send(list);
    } catch(err) {
      console.log('get list with recipients err', err);
      res.status(500).send(err);
    }
  });

  app.post('/api/lists/:id/recipients', requireLogin, async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    const {recipients} = req.body;
    console.log('patch list id', id);
    try {
      await Recipient.update({_id: {$in: recipients} },{$addToSet: {_lists: id}});
      let list = await List.findOneAndUpdate({_id: id}, {$addToSet: {_recipients: {$each: recipients} } });
      console.log('new list', list);
      res.send(list);
    } catch(err) {
      console.log('err patching list', err);
      res.status(500).send(err);
    }
  });

};