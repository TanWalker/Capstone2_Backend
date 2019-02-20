const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

// example router signup
router.post('/signup',userControllers.signin);

router.post('/signin',userControllers.signin);

module.exports = router;
