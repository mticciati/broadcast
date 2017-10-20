const mongoose = require('mongoose'), 
Schema = mongoose.Schema;

const recipientSchema = new Schema({

    _users: [
      {
        _id: false,
        user_id: {type: Schema.ObjectId, ref: 'User', required: true},
        subscription_status: {type: String, default: 'subscribed'}
      }
    ],
  // list_ids: [{ type : mongoose.Schema.Types.ObjectId, ref: 'List', required: true }],
    firstname: {type: String, required: true},
    lastname: String,
    email: String,
    phone: {type: String, required: true},
    // roles: { type : Array , "default" : [] },
    created_at: {type: Date, default: Date.now}

});

mongoose.model('recipients', recipientSchema);