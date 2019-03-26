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
router.get(
  '/api/getScheduleForRecord/:page_num',
  authCheck,
  scheduleController.getScheduleForRecord
);

//get schedule by id
router.get(
  '/api/getScheduleByID/:schedule_id',
  authCheck,
  scheduleController.getScheduleByID
);

// get schedule for record
router.get('/api/getDefaultSchedule', authCheck, scheduleController.getDefaultSchedule);

// get lesson by date
router.post('/api/getLessonByDate', authCheck, scheduleController.getLessonByDate);

// get lesson by date and coach
router.post('/api/getLessonByDateCoach', authCheck, scheduleController.getLessonByDateCoach);


module.exports = router;
