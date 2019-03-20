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

//router.put('/api/getUserIndex', authCheck, userControllers.getUserIndex)

module.exports = router;
