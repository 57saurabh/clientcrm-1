const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  comments: [{ text: String, date: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model('Query', QuerySchema);
