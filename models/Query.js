const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: String, required: true, match: /^\d{10}$/ },
  subject: { type: String, required: true, maxlength: 150 },
  message: { type: String, required: true, maxlength: 2000 },
  resolved: { type: Boolean, default: false },
  comments: [
    {
      text: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Query', QuerySchema);
