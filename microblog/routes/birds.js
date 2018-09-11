var express = require('express');
var router = express.Router();
//express.Router类可创建模块化、可挂载的路由句柄
//Router实例是一个完整的中间件和路由系统
//定义一个路由
router.get('/', function(req, res) {
    res.send('Birds home page');
});

//定义一个about页面的路由
router.get('/about', function(req, res) {
    res.send('About Birds');
});

//加载一个中间件
router.use(function timeLog(req, res, next) {
    console.log('\nTime:', Date.now());
    next(); //路由控制权转移的方法
});

//路由级中间件
// 挂载至 /:id 的中间件，任何指向 /:id 的请求都会执行它
router.use('/:id', function(req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

// 路由和句柄函数(中间件系统)，处理指向 /:id 的 GET 请求
router.get('/:id', function(req, res, next) {
    if (req.params.id == 0) {
        next('route');
    } else {
        next();
    }
}, function(req, res, next) {
    res.render('regular', { data: 'regular' });
});

// 处理 /:id， 渲染一个特殊页面
router.get('/:id', function(req, res, next) {
    console.log('id:', req.params.id);
    res.render('special', { data: 'special' });
});

//中间件种类
//应用级中间件
//路由级中间件
//错误处理中间件
//内置
//第三方

module.exports = router;