const scheduleController = require('../controllers/scheduleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addSchedule',authCheck, scheduleController.addSchedule);
router.get('/api/getSchedule',authCheck, scheduleController.getSchedule);
router.delete('/api/deleteSchedule', authCheck, scheduleController.deleteSchedule);
router.put('/api/updateSchedule', authCheck, scheduleController.updateSchedule);

module.exports = router;