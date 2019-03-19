const emailController = require('../controllers/emailController');
const express = require('express');
const router = express.Router();


router.post('/api/public/sendFeedBack', emailController.sendFeedBack);

module.exports = router;