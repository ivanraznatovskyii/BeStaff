const express = require('express');
const controller = require('../controllers/developers.controller');
const router = express.Router();

router.get('/devById', controller.getDevById);
router.get('/alldevs', controller.getAllDevelopers);
router.get('/stacks', controller.getAllSkills);


module.exports = router;