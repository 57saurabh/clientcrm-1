const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  resolved: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Query', querySchema);
