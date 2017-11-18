const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const keys = require('./config/keys');
require('./models/User');
require('./models/Recipient');
require('./models/List');
require('./models/BroadcastThread');
require('./models/Message');
require('./models/Broadcast');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/recipientRoutes')(app);
require('./routes/broadcastRoutes')(app);
require('./routes/listRoutes')(app);

if (process.env.NODE_ENV === 'production') {

  // Express will serve production assets
  app.use(express.static('client/build'));

  // Express will serve index.html when route not recognized
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
