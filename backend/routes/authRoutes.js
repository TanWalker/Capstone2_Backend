const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

// signin route
router.post('/api/public/login', userControllers.Login);

// signup route
router.post('/api/public/register', userControllers.Register);


module.exports = router;
