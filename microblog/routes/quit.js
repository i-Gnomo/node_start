var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('quit success');
});

module.exports = router;