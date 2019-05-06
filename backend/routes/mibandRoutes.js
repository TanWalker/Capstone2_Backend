const express = require('express');
const router = express.Router();
const mibandController = require('../controllers/mibandController');
const authCheck = require('../middleware/AuthGuard');

// GET route miband
router.get('/api/miband/:coach_id/:user_id/:schedule_id/:exercise_id', function(req, res, next) {
  res.render('index');
});

// POST route miband
router.post('/api/miband/:coach_id/:user_id/:schedule_id/:exercise_id', mibandController.getHeartRate);

module.exports = router;
