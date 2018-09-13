var express = require('express');
var router = express.Router();

/* POST USER WRITE */
router.post('/', function(req, res, next) {
    res.render('post', { title: 'post' });
});

module.exports = router;