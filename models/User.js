const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true }, // Name of the user
  companyName: { type: String, required: true }, // Company name
  website: { type: String, required: true } // Website of the user
});

module.exports = mongoose.model('User', UserSchema);
