const express = require('express');
const controller = require('../controllers/developers.controller');
const router = express.Router();

router.get('/', controller.getAllDevelopers);


module.exports = router;