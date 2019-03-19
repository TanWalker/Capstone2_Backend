const lessonExerciseController = require('../controllers/lessonExerciseController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add lessson exercise
router.post('/api/addLessonExercise', authCheck, lessonExerciseController.addLessonExercise);

// get lesson exercise
router.get('/api/getLessonExercise', authCheck, lessonExerciseController.getLessonExercise);

// delete lesson exercise
router.delete(
  '/api/deleteLessonExercise/:lesson_exercise_id',
  authCheck,
  lessonExerciseController.deleteLessonExercise
);

// update lesson exercise
router.put('/api/updateLessonExercise', authCheck, lessonExerciseController.updateLessonExercise);

// get by coach
router.get(
  '/api/getLessonExerciseByCoach',
  authCheck,
  lessonExerciseController.getLessonExerciseByCoach
);

// get by ID
router.get(
  '/api/getLessonExerciseByID/:lesson_exercise_id',
  authCheck,
  lessonExerciseController.getLessonExerciseByID
);

module.exports = router;
