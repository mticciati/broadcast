const passport = require('passport');
const mongoose = require('mongoose');
require('../models/User');

const User = mongoose.model('User');

module.exports = (app) => {

  app.post('/api/signup', async (req, res) => {
    if (req.body.email &&
      req.body.username &&
      req.body.password) { //&&
      // req.body.passwordConf) {

      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      try {
        await user.save();
        req.login(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/dashboard');
        });
      } catch(err) {
        console.log('Signup ERROR', err);
        res.status(422).send(err);
      }
    } else {
      console.log(req.body);
      res.send('Something is missing...');
    }
  });

};