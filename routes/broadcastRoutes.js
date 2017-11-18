const mongoose = require('mongoose');
const http = require('http');
const _ = require('lodash');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const requireLogin = require('../middlewares/requireLogin');
const twilioClient = require('../services/twilioClient');


const Broadcast = mongoose.model('Broadcast');
const BroadcastThread = mongoose.model('BroadcastThread');
const Message = mongoose.model('Message');

module.exports = app => {

  app.post('/api/broadcasts', requireLogin, async (req, res) => {

    console.log('creating broadcast', req.body);
    let { title, body, totalPositions, recipients} = req.body;
    const lastBroadcast = await Broadcast.findOne(
      {_user: req.user.id},
      {broadcast_id: 1},
      {sort: { 'created_at' : -1 } });
    console.log('lastBroadcast', lastBroadcast);
    const broadcast = new Broadcast({
      _user: req.user.id,
      _recipients: recipients,
      broadcast_id: lastBroadcast ? parseInt(lastBroadcast.broadcast_id) + 1 : 0,
      title,
      body,
      totalPositions,
      openPositions: totalPositions
    });

    try {
      await broadcast.save();
      let threads = _.map((recipients), (r_id) => {
          return {
            _broadcast: broadcast._id,
            _user: broadcast._user,
            _recipient: r_id
          }
      });

      console.log('pre saved threads', threads);

      //TODO send Twilio, then create broadcast threads

      BroadcastThread.create(threads, (err, threads) => {
        if (!threads) {
          console.log('no threads saved');
          return;
        }

        if (err) {
          console.log('saving threads error', err);
          res.status(500).send(err);
        }
        console.log('threads', threads);
        broadcast._broadcastThreads = threads;
        broadcast.save().then((broadcast) =>{
          res.send(broadcast);
        });

      });
    } catch (err) {
      console.log('save braodcast err', err);
      res.status(500).send(err);
    }

  });

  app.get('/api/broadcasts', requireLogin, async (req, res) => {
    console.log('fetching broadcasts');
    try {
      const broadcasts = await Broadcast
        .find({_user: req.user.id})
        .populate('_broadcastThreads')
        .exec();

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
        // update BroadcastThread.status
      // else
        // find BroadcastThread
        // update BroadcastThread.Messages
        // update BroadcastThread.status....

    const twiml = new MessagingResponse();
    twiml.message(message);

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

};
