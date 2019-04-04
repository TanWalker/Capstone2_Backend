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

// get by ID
router.get(
  '/api/getLessonExerciseByID/:lesson_exercise_id',
  authCheck,
  lessonExerciseController.getLessonExerciseByID
);

router.get(
  '/api/getLessonExerciseByLessonID/:lesson_id',
  authCheck,
  lessonExerciseController.getLessonExerciseByLessonID
);

router.delete(
  '/api/deleteLessonExerciseByLessonID/:lesson_id',
  authCheck,
  lessonExerciseController.deleteLessonExerciseByLessonID
);

module.exports = router;
