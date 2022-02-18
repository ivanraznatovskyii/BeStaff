const express = require('express');
const controller = require('../controllers/developers.controller');
const router = express.Router();

router.get('/devById', controller.getDevById);
router.get('/alldevs', controller.getAllDevelopers);
router.get('/stacks', controller.getAllStacks);
router.get('/skills', controller.getAllSkills);
router.post('/devCVById', controller.requestCVDevById);


router.post('/search', controller.searchByQuery);
router.post('/search/params', controller.searchByAllParams);

module.exports = router;