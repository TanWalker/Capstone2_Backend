const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authRoutes = require('../middleware/AuthGuard');

//create team
// router.post('/api/public/team',authRoutes, teamControllers.Add_Team);
router.post('/api/public/team', teamControllers.Add_Team);

module.exports = router;