const backgroundController = require('../controllers/backgroundController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// get random background
router.get('/api/getBackground', authCheck, backgroundController.randomBackground);


module.exports = router;
