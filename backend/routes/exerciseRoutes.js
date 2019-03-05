const exerciseController = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Exercise',authCheck, exerciseController.addExercise);
router.get('/api/getExercise',authCheck, exerciseController.getExercise);
router.delete('/api/deleteExercise/:exercise_id', authCheck, exerciseController.deleteExercise);
router.put('/api/updateExercise', authCheck, exerciseController.updateExercise);

module.exports = router;