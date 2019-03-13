const distanceController = require('../controllers/distanceController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add distance
router.post('/api/addDistance', authCheck, distanceController.addDistance);

// get distance
router.get('/api/public/getDistance', distanceController.getDistance);

// delete distance
router.delete(
  '/api/deleteDistance/:distance_id',
  authCheck,
  distanceController.deleteDistance
);

// update distance
router.put('/api/updateDistance', authCheck, distanceController.updateDistance);

module.exports = router;
