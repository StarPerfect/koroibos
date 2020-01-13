var express = require('express');
var router = express.Router();

const OlympianController = require('../../../controllers/olympiansController');

router.get('/', OlympianController.index)

module.exports = router;
