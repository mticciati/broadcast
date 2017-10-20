const keys = require('../config/keys');

// TODO clean the hell up

module.exports.sendSms = function(to, message, twilioNumber, test = false) {
  console.log(test);
  if (test) {
    console.log('test');
    const client = require('twilio')(keys.twilioSidTest, keys.twilioAuthTokenTest);
    // console.log(client.api.messages.create())
    return client.messages
      .create({
        body: message,
        to: to,
        from: twilioNumber,
      }).then((message) => {
        console.log('after send', message.sid)
        return message.sid;
      });
  } else {
    console.log('not test');
    const client = require('twilio')(keys.twilioSid, keys.twilioAuthToken);
    // console.log(client.api.messages.create())
    return client.messages
      .create({
        body: message,
        to: to,
        from: twilioNumber,
      }).then((message) => {
        console.log('after send', message.sid)
        return message.sid;
      });
  }
};