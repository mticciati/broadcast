const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  twilioNumber: {type: String}

  // passwordConf: {
  //   type: String,
  //   required: true,
  // }
});

userSchema.methods.validPassword = function (password, user) {
  console.log('validPassword this', this);
  console.log('password', password, 'user.password', user.password);
  return bcrypt.compareSync(password, user.password);
}

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

mongoose.model('users', userSchema);