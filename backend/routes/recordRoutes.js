const recordController = require('../controllers/recordController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addRecord', authCheck, recordController.addRecord);

router.get('/api/getRecord', authCheck, recordController.getRecord);

router.delete('/api/deleteRecord/:record_id', authCheck, recordController.deleteRecord);
module.exports = router;
