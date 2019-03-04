const exerciseController = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Exercise',authCheck, exerciseController.Add_Exercise);
router.get('/api/getExercise',authCheck, exerciseController.Get_Exercise);
router.delete('/api/deleteExercise', authCheck, exerciseController.Delete_Exercise);
router.put('/api/updateExercise', authCheck, exerciseController.Update_Exercise);

module.exports = router;