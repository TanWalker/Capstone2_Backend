const scheduleController = require('../controllers/scheduleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add schedule
router.post('/api/addSchedule', authCheck, scheduleController.addSchedule);

// get schedule
router.get('/api/getSchedule', authCheck, scheduleController.getSchedule);

// delete schedule
router.delete(
  '/api/deleteSchedule',
  authCheck,
  scheduleController.deleteSchedule
);

// update schedule
router.put('/api/updateSchedule', authCheck, scheduleController.updateSchedule);

// get schedule for record
router.get('/api/getScheduleForRecord/:page_num', authCheck, scheduleController.getScheduleForRecord);

module.exports = router;
