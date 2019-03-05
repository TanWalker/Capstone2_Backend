const lessonController = require('../controllers/lessonController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Lesson',authCheck, lessonController.addLesson);
router.get('/api/getLesson',authCheck, lessonController.getLesson);
router.delete('/api/deleteLesson', authCheck, lessonController.deleteLesson);
router.put('/api/updateLesson', authCheck, lessonController.updateLesson);

module.exports = router;