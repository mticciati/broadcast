const mongoose = require('mongoose');
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const requireLogin = require('../middlewares/requireLogin');
const twilioClient = require('../services/twilioClient');


const Broadcast = mongoose.model('Broadcast');

module.exports = app => {

  app.post('/api/broadcasts', requireLogin, async (req, res) => {

    console.log('creating broadcast', req.body);
    let { title, body, totalPositions} = req.body;
    const broadcast = new Broadcast({
      _user: req.user.id,
      title,
      body,
      totalPositions,
      openPositions: totalPositions
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
    const {broadcast_id} = req.body;
    const {twilioNumber, _id} = req.user;
    
    try {
      let broadcast = await Broadcast.findOne({_id: broadcast_id});
      if (twilioNumber && twilioNumber !== '') {
        let messageId = await twilioClient.sendSms(to, message, twilioNumber);
        console.log('message id returned', messageId);
        if (messageId) {
          broadcast.broadcastThreads
          let updatedBroadcast = broadcast.save();
        }
      } else {
        // Send error...
      }
    } catch(err) {
      console.log('Outgoing error', err);
      res.send(err);
    }
    
    res.send({});
  });

  app.post('/api/broadcasts/incoming', (req, res) => {
    console.log('body', req.body);
    console.log('session', req.session);
    const {From, Body, To} = req.body;
    const smsCount = req.session.counter || 0;
    req.session.counter = smsCount + 1;

    // TODO 
      // parse response
      // if opt out
        // find Recipient
      // else
        // find Broadcast
        // update Broadcast.conversation
        // update status.... 

    const twiml = new MessagingResponse();
    twiml.message(message);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

};