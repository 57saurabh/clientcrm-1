const Query = require('../models/Query');
const { createCSV } = require('../utils/csvUtils');

exports.postQuery = async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    await newQuery.save();
    res.status(201).json(newQuery);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getQueries = async (req, res) => {
  try {
    const queries = await Query.find();
    res.json(queries);
  } catch (err) {
    res.status(500).json(err);
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
