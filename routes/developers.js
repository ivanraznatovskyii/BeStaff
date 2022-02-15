const express = require('express');
const controller = require('../controllers/developers.controller');
const router = express.Router();

router.get('/alldevs', controller.getAllDevelopers);
router.get('/stacks', controller.getAllSkills);
router.get('/alldevs/:developerId', controller.getDevById);

module.exports = router;