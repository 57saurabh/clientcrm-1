const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Change from username to email
  password: { type: String, required: true },
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  website: { type: String, required: true },
  token: { type: String } // Token field
});

module.exports = mongoose.model('User', UserSchema);
