const teamControllers = require('../controllers/teamController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add team
router.post('/api/addTeam', authCheck, teamControllers.addTeam);

// get all team
router.get('/api/getTeam', authCheck, teamControllers.getTeam);

// delete team
router.delete(
  '/api/deleteTeam/:team_id',
  authCheck,
  teamControllers.deleteTeam
);

// update team
router.put('/api/updateTeam', authCheck, teamControllers.updateTeam);

// get team by coach
router.get('/api/getTeamByCoach', authCheck, teamControllers.getTeamByCoach);

// get member by team id
router.get(
  '/api/getMemberByTeam/:team_id',
  authCheck,
  teamControllers.getMemberByTeam
);

// get member by Id
router.post('/api/getMemberById', authCheck, teamControllers.getMemberById);

// remove member out of team
router.delete(
  '/api/removeTeamMember',
  authCheck,
  teamControllers.removeTeamMember
);

router.put(
  '/api/addTeamMember',
  authCheck,
  teamControllers.addMemberToTeam
);
module.exports = router;
