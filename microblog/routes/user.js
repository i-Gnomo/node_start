var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.use('/:id', function(req, res, next) {
    console.log('User Request:', req.baseUrl);
    next();
});

router.get('/:id', function(req, res, next) {
    res.render('user', { title: 'user', data: 'user主页' });
});

module.exports = router;