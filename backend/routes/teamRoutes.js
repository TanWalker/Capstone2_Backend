const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/team', authCheck, teamControllers.addTeam);
router.get('/api/getTeam', authCheck, teamControllers.getTeam);
router.delete(
  '/api/deleteTeam/:team_id',
  authCheck,
  teamControllers.deleteTeam
);
router.put('/api/updateTeam', authCheck, teamControllers.updateTeam);
router.get('/api/getTeamByCoach', authCheck, teamControllers.Get_Team_By_Coach);
router.get('/api/getMemberByTeam/:team_id', authCheck, teamControllers.Get_Member_By_Team);

module.exports = router;
