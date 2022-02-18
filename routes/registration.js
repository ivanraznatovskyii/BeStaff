const express = require('express');
const controller = require('../controllers/registration.controller');
const router = express.Router();


router.get('/positions', controller.getPositions);


module.exports = router;
