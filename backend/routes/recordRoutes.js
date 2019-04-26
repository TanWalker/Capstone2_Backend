const recordController = require('../controllers/recordController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add record
router.post('/api/addDailyRecord', authCheck, recordController.addDailyRecord);

// get record
router.get('/api/getRecord', authCheck, recordController.getRecord);

// delete record
router.delete(
  '/api/deleteRecord/:record_id',
  authCheck,
  recordController.deleteRecord
);
// get Record By User Schedule and Exercise getRecordByUserScheduleExercise
router.post('/api/getRecordByUserScheduleExercise', authCheck, recordController.getRecordByUserScheduleExercise);

//  getRecordByUserScheduleExercise
router.post('/api/getRecordByMonthYearOfCurrentUser', authCheck, recordController.getRecordByMonthYearOfCurrentUser);

// get RecordByUserScheduleExercise
router.post('/api/getRecordByYearOfCurrentUser', authCheck, recordController.getRecordByYearOfCurrentUser);

// get record by id
router.get('/api/getRecordByID/:record_id', authCheck, recordController.getRecordByID);

//get list exercises in record by month
router.post('/api/getListRecordByMonthOfYear', authCheck, recordController.getListRecordByMonthOfYear);

//get list exercises in record by year
router.post('/api/getListRecordByYear', authCheck, recordController.getListRecordByYear);

module.exports = router;
