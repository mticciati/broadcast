const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Recipient = mongoose.model('Recipient');

module.exports = (app) => {

  app.post('/api/recipients', requireLogin, async (req, res) => {
    console.log('create recipient route', req.body);
    console.log('user.id', req.user.id);
    const {_id} = req.user;
    try {
      const existingRecipient = await Recipient.findOne({
        phone: req.body.phone,
        _user: _id});

      if (existingRecipient) {
        console.log('recipient exists!');
        return res.send('That recipient already exists!');
      } 

      try {
        const recipient = new Recipient({
          _users: [],
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone
        });

        recipient._users.push({_user: _id});
        await recipient.save();
        res.send(recipient);
      } catch (err) {
        console.log('RECIPIENT ERROR', err);
        res.status(500).send(err);
      }

    } catch (err) {
      console.log('RECIPIENT ERROR', err);
      res.status(500).send(err);
    }
  }); 

  app.get('/api/recipients', requireLogin, async (req, res) => {
    const {_id} = req.user;
    console.log('get recipients user id ', _id);
    try {
      const recipients = await Recipient.find(
        {
          _users: {
            $elemMatch: {_user: _id}
          }
        });
      console.log('recipients', recipients);
      if (!recipients) {
        console.log('no recipients found');
        return res.send('No recipients yet...');
      }

      res.send(recipients);
    } catch (err) {
      console.log('FETCH RECIPIENTS ERROR', err);
      res.status(500).send(err);
    }
  });

  // TODO
  app.get('/api/recipients/:phone', requireLogin, async (req, res) => {

  });

};