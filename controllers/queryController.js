const Query = require('../models/Query');
const User = require('../models/User');
const { createCSV } = require('../utils/csvUtils');

exports.postQuery = async (req, res) => {
  try {
    console.log(req.body);
    // Get the clientId from the request body
    const { clientId, name, email, phone, subject, message } = req.body;

    // Optionally, validate if the user exists
    const user = await User.findById(clientId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newQuery = new Query({
      clientId, // Use the client's ObjectId
      name,
      email,
      phone,
      subject,
      message
    });
    
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getQueries = async (req, res) => {
  const { clientId } = req.params; // Accept clientId from the request query parameters

  try {
    // Validate if clientId is provided
    if (!clientId) {
      return res.status(400).json({
        status: 'fail',
        statusCode: 400,
        message: 'Client ID is required',
        data: null,
      });
    }

    // Check if the clientId exists in the User collection
    const userExists = await User.findById(clientId);

    if (!userExists) {
      return res.status(404).json({
        status: 'fail',
        statusCode: 404,
        message: 'User not found with the provided client ID',
        data: null,
      });
    }

    // Find all queries associated with the provided clientId
    const queries = await Query.find({ clientId }).populate(
      'clientId',
      'email name companyName website'
    );

    // Check if queries are found
    if (!queries || queries.length === 0) {
      return res.status(404).json({
        status: 'fail',
        statusCode: 404,
        message: 'No queries found for this client',
        data: [],
      });
    }

    // Successful response
    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Queries retrieved successfully',
      data: queries,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Server error',
      error: err.message,
      data: null,
    });
  }
};

exports.resolveQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json('Query not found');
    query.resolved = true;
    await query.save();
    res.json(query);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.commentOnQuery = async (req, res) => {
  try {
    
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json('Query not found');
    query.comments.push({ text: req.body.text });
    await query.save();
    res.json(query);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.downloadCSV = async (req, res) => {
  try {
    const queries = await Query.find();
    const csv = await createCSV(queries);
    res.header('Content-Type', 'text/csv');
    res.attachment('queries.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json(err);
  }
};
