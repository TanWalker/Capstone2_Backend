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
router.get('/api/getRecordByUserScheduleExercise', authCheck, recordController.getRecordByUserScheduleExercise);

module.exports = router;
