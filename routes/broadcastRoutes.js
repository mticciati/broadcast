const mongoose = require('mongoose');
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const requireLogin = require('../middlewares/requireLogin');
const twilioClient = require('../services/twilioClient');


const Broadcast = mongoose.model('broadcasts');

module.exports = app => {

  app.post('/api/broadcasts', requireLogin, async (req, res) => {

    console.log('creating broadcast', req.body);

    const broadcast = new Broadcast({
      _user: req.user.id,
      title: req.body.title,
      body: req.body.body,
      totalPositions: req.body.totalPositions,
      openPositions: req.body.totalPositions
    });

    try {
      await broadcast.save();
      res.send(broadcast);
    } catch (err) {
      console.log('save braodcast err', err);
      res.status(500).send(err);
    }

  });

  app.get('/api/broadcasts', requireLogin, async (req, res) => {
    console.log('fetching broadcasts');
    try {
      const broadcasts = await Broadcast.find({_user: req.user.id});

      if (!broadcasts) {
        console.log('no broadcasts found');
        return res.send('No broadcasts yet...');
      }
      res.send(broadcasts);
    } catch (err) {
      console.log('FETCH BROADCASTS ERROR', err);
      res.status(500).send(err);
    }

  });

  app.post('/api/broadcasts/outgoing', requireLogin, async (req, res) => {
    console.log(req.body);
    const {to, message, test} = req.body;
    const {twilioNumber} = req.user;
    if (twilioNumber && twilioNumber !== '') {
      let messageId = await twilioClient.sendSms(to, message, twilioNumber);
      console.log('message id returned', messageId);
    } else {
      // Send error...
    }
    res.send({});
  });

  app.post('/api/broadcasts/incoming', (req, res) => {
    console.log(req.body);
  });

};