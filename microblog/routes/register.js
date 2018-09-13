var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { title: 'register' });
});
router.post('/', function(req, res, next) {
    res.render('register', { title: 'register' });
});

module.exports = router;