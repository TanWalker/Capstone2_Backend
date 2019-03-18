const typeController = require('../controllers/typeController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');


// get all type
router.get('/api/public/getTypeOfExercise', typeController.getType);


module.exports = router;
