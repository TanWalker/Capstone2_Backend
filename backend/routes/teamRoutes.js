const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/team', authCheck, teamControllers.Add_Team);
router.get('/api/getTeam', authCheck, teamControllers.Get_Team);
router.delete(
  '/api/deleteTeam/:team_id',
  authCheck,
  teamControllers.Delete_Team
);
router.put('/api/updateTeam', authCheck, teamControllers.Update_Team);
router.get('/api/getTeamByCoach', authCheck, teamControllers.Get_Team_By_Coach);

module.exports = router;
