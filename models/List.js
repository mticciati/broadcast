const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  _user: {type: Schema.ObjectId, ref: 'User', required: true},
  _recipients: [{type: Schema.ObjectId, ref: 'Recipient'}],
  name: {type: String, required: true},
  description: String
});

mongoose.model('List', listSchema);