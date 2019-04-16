const libraryController = require('../controllers/libraryController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// get link by style ID
router.post('/api/getYoutubeByStyleId', authCheck, libraryController.getYoutubeByStyleId);

// upload link by style ID
router.post('/api/uploadLinkByStyleId', authCheck, libraryController.uploadLinkByStyleId);

// delete link by style ID
router.delete('/api/deleteLink', authCheck, libraryController.deleteLink);

module.exports = router;