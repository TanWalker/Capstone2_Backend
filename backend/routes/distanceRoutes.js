const distanceController = require('../controllers/distanceController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addDistance', authCheck, distanceController.addDistance);
router.get('/api/public/getDistance', distanceController.getDistance);
router.delete(
  '/api/deleteDistance/:distance_id',
  authCheck,
  distanceController.deleteDistance
);
router.put('/api/updateDistance', authCheck, distanceController.updateDistance);

module.exports = router;
  