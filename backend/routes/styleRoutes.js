const styleController = require('../controllers/styleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/addStyle',authCheck, styleController.addStyle);
router.get('/api/public/getStyle', styleController.getStyle);
router.delete('/api/deleteStyle/:style_id', authCheck, styleController.deleteStyle);
router.put('/api/updateStyle', authCheck, styleController.updateStyle);

//Get Style By Coach.
router.get('/api/getStyleByCoach',authCheck, styleController.getStyleByCoach);

module.exports = router;