const mongoose = require('mongoose'),
Schema = mongoose.Schema;
// const _ = require('lodash');

// const BroadcastThread = mongoose.model('BroadcastThread');

const broadcastSchema = new Schema({
  _user: {type: Schema.ObjectId, ref: 'User', required: true},
  _recipients: [{type: Schema.ObjectId, ref: 'Recipient'}],
  _broadcastThreads: [{type: Schema.ObjectId, ref: 'BroadcastThread'}],
  broadcast_id: {type: String},
  title: {type: String, required: true},
  body: {type: String, required: true, maxlength: 160},
  totalPositions: {type: String, required: true}, //Needed for filling positions
  openPositions: {type: String, required: true}, //Needed to track filled positions
  created_at: {type: Date, default: Date.now}
  //TODO
  // custom responses?
  // status: {type: String, default: 'draft'}, // draft || active || complete // TODO cancelled?
  // Conversation?
  // Pay?
  // Final step? i.e. Send email or something...
});

// auto increment for each User
// broadcastSchema.pre('save', function(next) {
//
//   if (!this.isNew) {
//     return next();
//   }
//
//   var doc = this;
//   var broadcast_id = 1;
//   Broadcast.find({_user: doc._user}, (err, broadcasts) => {
//     if (err) throw err;
//     broadcast_id = broadcasts.length + 1;
//     doc.broadcast_id = broadcast_id;
//     next();
//   });
//
// });

// broadcastSchema.post('save', function(doc, next) {
//
//   console.log('broadcast post save');
//   console.log('doc', doc);
//   // foreach recipient start broadacstThread
//   _.forEach(doc._recipients, (recipient) => {
//     var thread = new BroadcastThread({
//       _broadcast: doc._id,
//       _user: doc._user,
//       _recipient: recipient._id
//     });
//
//     thread.save();
//     doc._broadcastThreads.push(thread);
//   });
//   next();
//
// });

mongoose.model('Broadcast', broadcastSchema);
