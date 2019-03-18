const express = require('express');
const router = express.Router();
const versionController = require('../controllers/versionController');

// version route
router.get('/api/public/backendversion', versionController.getVersion);

// app version
router.get('/api/public/appVersion', versionController.getAppVersion);
module.exports = router;
