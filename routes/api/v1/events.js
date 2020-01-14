var express = require('express');
var router = express.Router();

const eventsController = require('../../../controllers/eventsController');

router.get('/', eventsController.index);
router.get('/:id/medalists', eventsController.show);

module.exports = router;