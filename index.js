require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const queryRoutes = require('./routes/queryRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/queries', queryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a function to handle requests
app.get('/', (req, res) => {
  res.send('Welcome to the Express API');
});

// Export the app for Vercel
module.exports = app;

// Vercel will automatically call the app when deployed
