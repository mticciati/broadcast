const passport = require('passport');

module.exports = (app) => {

  // app.get(
  //   '/auth/google', 
  //   passport.authenticate('google', {
  //     scope: ['profile', 'email']
  //   })
  // );

  // app.get(
  //   '/auth/google/callback',
  //   passport.authenticate('google'),
  //   (req, res) => res.redirect('/surveys')
  // );

  app.post('/api/login',
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),
    (req, res) => {
      console.log('reached login success');
      // res.send(req.user);
      res.redirect('/dashboard');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};