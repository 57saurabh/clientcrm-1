const Query = require('../models/Query');
const csvWriter = require('csv-writer').createObjectCsvWriter;

exports.dashboard = async (req, res) => {
  const queries = await Query.find({ clientId: req.user.id }).sort({ date: -1 });
  res.render('dashboard', { queries });
};

// API to handle form submissions from different websites
exports.submitQuery = async (req, res) => {
  try {
    const { clientId, name, email, phone, subject, message } = req.body;

    // Validate input
    if (!clientId || !name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create and save the query
    const query = new Query({ clientId, name, email, phone, subject, message });
    await query.save();

    res.status(201).json({ success: 'Query submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Mark query as resolved
exports.resolveQuery = async (req, res) => {
  try {
    const { queryId } = req.params;
    await Query.findByIdAndUpdate(queryId, { resolved: true });
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Export queries to CSV
exports.exportToCSV = async (req, res) => {
  try {
    const queries = await Query.find({ clientId: req.user.id }).sort({ date: -1 });
    
    const csv = csvWriter({
      path: 'queries.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'subject', title: 'Subject' },
        { id: 'message', title: 'Message' },
        { id: 'resolved', title: 'Resolved' },
        { id: 'date', title: 'Date' },
      ],
    });

    await csv.writeRecords(queries);
    res.download('queries.csv');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error.' });
  }
};
