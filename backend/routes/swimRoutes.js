const teamControllers = require('../controllers/swimController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.get('/api/getSwimStyle', swimController.getSwimStyle);


module.exports = router;