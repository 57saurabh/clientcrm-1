const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

// API endpoint to handle form submissions from different websites
router.post('/submit-query', queryController.submitQuery);

// API endpoint to export queries to CSV
router.get('/export-csv', queryController.exportToCSV);

module.exports = router;
