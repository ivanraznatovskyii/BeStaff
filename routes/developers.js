const express = require('express');
const controller = require('../controllers/developers.controller');
const router = express.Router();

router.get('/alldevs', controller.getAllDevelopers);
router.get('/stacks', controller.getAllSkills);


module.exports = router;