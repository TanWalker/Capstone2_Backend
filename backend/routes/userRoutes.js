const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

// signin route
router.get('/signin', userControllers.Signin);

// signup route
router.post('/signup', userControllers.Signup);

module.exports = router;
