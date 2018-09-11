var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log(__dirname, __filename);
    //res.render(模板名称,传递给模板的数据)调用模板引擎
    res.render('index', { title: 'Express' });
});

module.exports = router;