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

  app.patch('/api/lists/:id', requireLogin, async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;
    const {name, description} = req.body;
    try {
      let query = {_id: id, _user: _id};
      let update = {$set: {name, description}};
      let options = {new: true};
      let list = await List
        .findOneAndUpdate(query, update, options)
        .populate('_recipients')
        .exec();
      console.log('updated list', list);
      res.send(list);
    } catch (err) {
      console.log('patch list err', err);
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
      // console.log('list', list);
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
    console.log('add recipient - patch list id', id);
    try {
      await Recipient.update({_id: {$in: recipients} },{$addToSet: {_lists: id}});
      let query = {_id: id};
      let update = {$addToSet: {_recipients: {$each: recipients} } };
      let options = {new: true};
      let list = await List
        .findOneAndUpdate(query, update, options)
        .populate('_recipients')
        .exec();
      console.log('new list', list);
      res.send(list);
    } catch(err) {
      console.log('err patching list', err);
      res.status(500).send(err);
    }
  });


  app.delete('/api/lists/:id/recipients/:recipient_id', requireLogin, async (req, res) => {
    const {id, recipient_id} = req.params;
    const {_id} = req.user;
    console.log('remove recipient - patch list id', id);
    console.log('recipient_id,', recipient_id);
    try {
      await Recipient.update({_id: recipient_id},{$pull: {_lists: id}});
      let query = {_id: id};
      let update = {$pull: { _recipients: recipient_id } };
      let options = {new: true};
      let list = await List
        .findOneAndUpdate(query, update, options)
        .populate('_recipients')
        .exec();
      console.log('new list', list);
      res.send(list);
    } catch(err) {
      console.log('err patching list', err);
      res.status(500).send(err);
    }
  });

};
