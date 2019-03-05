const scheduleController = require('../controllers/scheduleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Lesson',authCheck, scheduleController.addLesson);
router.get('/api/getLesson',authCheck, scheduleController.getLesson);
router.delete('/api/deleteLesson', authCheck, scheduleController.deleteLesson);
router.put('/api/updateLesson', authCheck, scheduleController.updateLesson);

module.exports = router;