const recordController = require('../controllers/recordController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addRecord', authCheck, recordController.addRecord);

router.get('/api/getRecord', authCheck, recordController.getRecord);

module.exports = router;
