const styleController = require('../controllers/styleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

router.post('/api/Style',authCheck, styleController.Add_Style);
router.get('/api/getStyle',authCheck, styleController.Get_Style);
router.delete('/api/deleteStyle', authCheck, styleController.Delete_Style);
router.put('/api/updateStyle', authCheck, styleController.Update_Style);

module.exports = router;