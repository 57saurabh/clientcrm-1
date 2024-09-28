const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  postQuery,
  getQueries,
  resolveQuery,
  commentOnQuery,
  downloadCSV
} = require('../controllers/queryController');

router.post('/', postQuery); // Public
router.get('/:clientId', authMiddleware, getQueries); // Protected
router.put('/resolve/:id', authMiddleware, resolveQuery); // Protected
router.post('/comment/:id', authMiddleware, commentOnQuery); // Protected
router.get('/download-csv', authMiddleware, downloadCSV); // Protected

module.exports = router;
