var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(__dirname, __filename);
    res.render('index', { title: 'Express' });
});

module.exports = router;