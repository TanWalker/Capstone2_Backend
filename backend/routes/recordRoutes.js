const recordController = require('../controllers/recordController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add record
router.post('/api/addRecord', authCheck, recordController.addRecord);

// get record
router.get('/api/getRecord', authCheck, recordController.getRecord);

// delete record
router.delete(
  '/api/deleteRecord/:record_id',
  authCheck,
  recordController.deleteRecord
);

module.exports = router;
