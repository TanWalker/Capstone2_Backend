const videoController = require('../controllers/videoController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');


// get all type
router.post('/api/public/getYoutubeVideoInfo', videoController.getYoutubeVideoInfo);

module.exports = router;
