const libraryController = require('../controllers/libraryController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// get link by style ID
router.post('/api/getYoutubeByStyleId', authCheck, libraryController.getYoutubeByStyleId);

module.exports = router;