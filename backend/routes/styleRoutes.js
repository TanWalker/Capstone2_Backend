const styleController = require('../controllers/styleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Style',authCheck, styleController.addStyle);
router.get('/api/getStyle',authCheck, styleController.getStyle);
router.delete('/api/deleteStyle/:style_id', authCheck, styleController.deleteStyle);
router.put('/api/updateStyle', authCheck, styleController.updateStyle);

module.exports = router;