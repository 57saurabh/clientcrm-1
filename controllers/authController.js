const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/auth');

exports.register = async (req, res) => {
  const { email, password, name, companyName, website } = req.body; // Change username to email
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      name, 
      companyName, 
      website 
    });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body; // Change username to email
  try {
    const user = await User.findOne({ email }); // Change from username to email
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, jwtSecret);
    
    // Save the token in the database
    user.token = token;
    await user.save();

    res.json({ token });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params; // Assume user ID is provided in the route parameters
  const { email, name, companyName, website } = req.body; // Fields to update

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      email,
      name,
      companyName,
      website
    }, { new: true }); // Return the updated document

    if (!updatedUser) return res.status(404).json('User not found');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
