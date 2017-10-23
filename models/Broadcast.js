const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const BroadcastThreadSchema = require('./broadcastThread');

const broadcastSchema = new Schema({
  _user: {type: Schema.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  body: {type: String, required: true, maxlength: 160},
  totalPositions: {type: String, required: true}, //Needed for filling positions
  openPositions: {type: String, required: true}, //Needed to track filled positions
  _lists: [{type: Schema.ObjectId, ref: 'List'}],
  broadcastThreads: [BroadcastThreadSchema],
  created_at: {type: Date, default: Date.now}
  //TODO 
  // custom responses?
  // status: {type: String, default: 'draft'}, // draft || active || complete // TODO cancelled?
  // Conversation?
  // Pay?
  // Final step? i.e. Send email or something...
});

mongoose.model('Broadcast', broadcastSchema);