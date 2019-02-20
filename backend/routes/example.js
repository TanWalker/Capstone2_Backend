const express = require('express');
const router = express.Router();
const exampleControllers = require('../controllers/exampleController');

// example router shoot JSON to frontend
router.get('/get',exampleControllers.example1);

// example router get json from frontend
router.post('/post',exampleControllers.example2);

module.exports = router;
