const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sent_by: {type: String, default: 'me'},
  body: {type: String, required: true},
  created_at: {type: Date, default: Date.now()}
});

mongoose.model('Message', messageSchema);
