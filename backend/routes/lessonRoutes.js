const lessonController = require('../controllers/Lesson_PlanController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Lesson',authCheck, lessonController.Add_Lesson);
router.get('/api/getLesson',authCheck, lessonController.Get_Lesson);
router.delete('/api/deleteLesson', authCheck, lessonController.Delete_Lesson);
router.put('/api/updateLesson', authCheck, lessonController.Update_Lesson);

module.exports = router;