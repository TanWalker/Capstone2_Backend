const lessonController = require('../controllers/lessonController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add Lesson
router.post('/api/addLesson', authCheck, lessonController.addLesson);

// get Lesson
router.get('/api/getLesson', authCheck, lessonController.getLesson);

// delete Lesson
router.delete(
  '/api/deleteLesson/:lesson_id',
  authCheck,
  lessonController.deleteLesson
);

// update Lesson
router.put('/api/updateLesson', authCheck, lessonController.updateLesson);

// get by coach
router.get(
  '/api/getLessonByCoach',
  authCheck,
  lessonController.getLessonByCoach
);

// get by ID
router.get(
  '/api/getLessonByID/:lesson_id',
  authCheck,
  lessonController.getLessonByID
);

module.exports = router;
