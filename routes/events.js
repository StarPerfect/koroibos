var express = require('express');
var router = express.Router();

const statsController = require('../../../controllers/eventsController');

router.get('/', eventsController.index);

module.exports = router;