const exerciseController = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add exercise
router.post('/api/addExercise', authCheck, exerciseController.addExercise);

// get exercise
router.get('/api/getExercise', authCheck, exerciseController.getExercise);

// delete exercise
router.delete(
  '/api/deleteExercise/:exercise_id',
  authCheck,
  exerciseController.deleteExercise
);

// update exercise
router.put('/api/updateExercise', authCheck, exerciseController.updateExercise);

// get by coach
router.get(
  '/api/getExerciseByCoach',
  authCheck,
  exerciseController.getExerciseByCoach
);

// get by ID
router.get(
  '/api/getExerciseByID/:exercise_id',
  authCheck,
  exerciseController.getExerciseByID
);

// get Exercises by Lesson ID
router.get(
  '/api/getFinalExerciseByLessonID/:lesson_id',
  authCheck,
  exerciseController.getFinalExerciseByLessonID
);

// get Exercises Group by Style
router.get(
  '/api/getExerciseGroupByStyle',
  authCheck,
  exerciseController.getExerciseGroupByStyle
);

module.exports = router;
