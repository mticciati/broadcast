const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const broadcastSchema = new Schema({
  _user: {type: Schema.ObjectId, ref: 'User', required: true},
  title: {type: String, required: true},
  body: {type: String, required: true, maxlength: 160},
  totalPositions: {type: String, required: true}, //Needed for filling positions
  openPositions: {type: String, required: true}, //Needed to track filled positions
  // status: {type: String, default: 'draft'}, // draft || active || complete // TODO cancelled?
  created_at: {type: Date, default: Date.now}
  //TODO 
  // response: {type: Schema.ObjectId, ref: 'Respnose'}, // links to response object with custom responses
  // list: {type: Schema.ObjectId, ref: 'List'} ?
  // Conversation?
  // Pay?
  // Final step? i.e. Send email or something...
});

mongoose.model('broadcasts', broadcastSchema);