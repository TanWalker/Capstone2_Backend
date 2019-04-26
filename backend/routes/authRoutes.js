const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const authCheck = require('../middleware/AuthGuard');

// signin route
router.post('/api/public/login', userControllers.Login);

// signup route
router.post('/api/public/register', userControllers.Register);

// update user info route
router.put('/api/updateUser', authCheck, userControllers.updateUser);

// get current user
router.get('/api/getCurrentUser', authCheck, userControllers.getCurrentUser);

//get user index
router.get('/api/getUserIndex', authCheck, userControllers.getUserIndex);

//get BMI tips
router.get('/api/getUserBMITips/:bmi', authCheck, userControllers.getUserBMITips);

//get heart-rate tips
router.get('/api/getUserHRTips/:hr', authCheck, userControllers.getUserHRTips);

//get heart-rate tips
router.get('/api/getUserSpeedTips/:pace', authCheck, userControllers.getUserSpeedTips);


// get all user in system
router.get('/api/getTrainee', authCheck, userControllers.getTrainee);

module.exports = router;
