const Client = require('../models/Clients');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Render the login page
exports.login = (req, res) => {
  res.render('login');
};

// Handle login form submission
exports.loginPost = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

// Handle logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
};

// Render the registration page
exports.register = (req, res) => {
  res.render('register', {
    errors: [], // Pass an empty array if no errors exist
    username: '',
    password: '',
    password2: '',
  });
};

// Handle registration form submission
exports.registerPost = async (req, res) => {
  const { username, password, password2 } = req.body;
  let errors = [];

  // Validate input
  if (!username || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('register', {
      errors,
      username,
      password,
      password2,
    });
  } else {
    try {
      // Check if user already exists
      const existingClient = await Client.findOne({ username });

      if (existingClient) {
        errors.push({ msg: 'Username already exists' });
        res.render('register', {
          errors,
          username,
          password,
          password2,
        });
      } else {
        // Create new client
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newClient = new Client({
          username,
          password: hashedPassword,
        });

        await newClient.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/login');
      }
    } catch (err) {
      console.error(err);
      res.render('register', {
        errors: [{ msg: 'An error occurred. Please try again later.' }],
        username,
        password,
        password2,
      });
    }
  }
};
