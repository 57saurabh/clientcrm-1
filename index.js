require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import cors middleware


const app = express();


const PORT = process.env.PORT || 3000;

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


// CORS middleware
app.use(cors()); // Enable CORS for all origins

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // This line is crucial for parsing JSON request bodies

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set views
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/dashboard'));
app.use('/api', require('./routes/api')); // API route

// API endpoint to handle form submissions
app.post('/submit-query', require('./controllers/queryController').submitQuery);

app.listen(process.env.PORT, () => console.log('Server started on port 3000'));
