const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Please log in to view that resource');
  res.redirect('/login');
}

router.get('/dashboard', ensureAuthenticated, queryController.dashboard);
router.post('/resolve-query/:queryId', ensureAuthenticated, queryController.resolveQuery);

module.exports = router;
