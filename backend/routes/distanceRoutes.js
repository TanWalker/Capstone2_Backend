const distanceController = require('../controllers/distanceController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Distance',authCheck, distanceController.Add_Distance);
router.get('/api/getDistance',authCheck, distanceController.Get_Distance);
router.delete('/api/deleteDistance', authCheck, distanceController.Delete_Distance);
router.put('/api/updateDistance', authCheck, distanceController.Update_Distance);

module.exports = router;