const libraryController = require('../controllers/libraryController');
const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/AuthGuard');

// ******************** Technique routes *********************

// get link by style ID
router.post('/api/getLinkTechniqueByStyleId', authCheck, libraryController.getLinkTechniqueByStyleId);

// upload link by style ID
router.post('/api/uploadLinkTechniqueByStyleId', authCheck, libraryController.uploadLinkTechniqueByStyleId);

// delete link by style ID
router.delete('/api/deleteLinkTechnique/:link_id', authCheck, libraryController.deleteLinkTechnique);

// get new link inserted
router.get('/api/getNewLinkTechnique', authCheck, libraryController.getNewLinkTechnique);

// ****************** Nutrition routes ***********************

// get link 
router.get('/api/getLinkNutrition', authCheck, libraryController.getLinkNutrition);

// upload link
router.post('/api/uploadLinkNutrition', authCheck, libraryController.uploadLinkNutrition);

// delete link
router.delete('/api/deleteLinkNutrition/:link_id', authCheck, libraryController.deleteLinkNutrition);

// get new link inserted
router.get('/api/getNewLinkNutrition', authCheck, libraryController.getNewLinkNutrition);

module.exports = router;