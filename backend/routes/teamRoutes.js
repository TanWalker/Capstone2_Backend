const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/team',authCheck, teamControllers.Add_Team);
router.get('/api/getTeam',authCheck, teamControllers.Get_Team);

module.exports = router;