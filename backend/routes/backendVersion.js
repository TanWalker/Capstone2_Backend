const express = require('express');
const router = express.Router();
const versionController = require('../controllers/versionController');

// version route
router.get('/backendversion', versionController.getVersion);

module.exports = router;
