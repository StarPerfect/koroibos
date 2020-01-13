var express = require('express');
var router = express.Router();

const statsController = require('../../../controllers/statsController');

router.get('/', statsController.show);

module.exports = router;