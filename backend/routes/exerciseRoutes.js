const exerciseController = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addExercise',authCheck, exerciseController.addExercise);
router.get('/api/getExercise',authCheck, exerciseController.getExercise);
router.delete('/api/deleteExercise/:exercise_id', authCheck, exerciseController.deleteExercise);
router.put('/api/updateExercise', authCheck, exerciseController.updateExercise);
//get by coach
router.get('/api/getExerciseByCoach', authCheck, exerciseController.getExerciseByCoach);

//get by ID
router.get('/api/getExerciseByID/:exercise_id', authCheck, exerciseController.getExerciseByID);
module.exports = router;