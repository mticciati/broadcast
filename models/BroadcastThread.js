const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const broadcastThreadSchema = new Schema({
  _broadcast: {type: Schema.ObjectId, ref: 'Broadcast', required: true},
  _user: {type: Schema.ObjectId, ref: 'User', required: true},
  _recipient: {type: Schema.ObjectId, ref: 'Recipient', required: true},
  status: {type: String, default: 'Pending'},
  _messages: [{type: Schema.ObjectId, ref: 'Message'}]
});

mongoose.model('BroadcastThread', broadcastThreadSchema);
