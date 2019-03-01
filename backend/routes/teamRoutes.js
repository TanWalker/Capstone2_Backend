const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/team',authCheck, teamControllers.Add_Team);

module.exports = router;