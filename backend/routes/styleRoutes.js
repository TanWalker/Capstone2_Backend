const styleController = require('../controllers/styleController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// add style
router.post('/api/addStyle', authCheck, styleController.addStyle);

// get all style
router.get('/api/public/getStyle', styleController.getStyle);

// delete style
router.delete(
  '/api/deleteStyle/:style_id',
  authCheck,
  styleController.deleteStyle
);

// update style
router.put('/api/updateStyle', authCheck, styleController.updateStyle);

//Get Style By Coach.
router.get('/api/getStyleByCoach', authCheck, styleController.getStyleByCoach);

// get style by id
router.get(
  '/api/getStyleById/:style_id',
  authCheck,
  styleController.getStyleById
);

module.exports = router;
