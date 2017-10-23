const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  body: {type: String, required: true},
  created_at: {type: Date, default: Date.now()}
});

const broadcastThreadSchema = new Schema({
  _recipient: {type: Schema.ObjectId, ref: 'Recipient', required: true},
  status: {type: String, default: 'Pending'},
  conversation: [conversationSchema]
});

// mongoose.model('broadcastThreads', broadcastThreadSchema);
module.exports = broadcastThreadSchema;