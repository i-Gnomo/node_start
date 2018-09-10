var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //第三方中间件
var logger = require('morgan');

//加载路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var birds = require('./routes/birds');

//express实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//加载用于解析cookie的中间件
app.use(cookieParser());
// Express内置的express.static可托管静态文件
app.use(express.static(path.join(__dirname, 'public')));
//所有文件的路径都相对于存放目录 因此，存放静态文件的目录名不会出现在 URL 中。
//http://localhost:3000/stylesheets/style.css

// app.use('/static',express.static(path.join(__dirname, 'public')));
//http://localhost:3000/static/stylesheets/style.css

//__dirname
//__filename


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/birds', birds);

//应用级中间件
//没有挂载路径
app.use(function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { error: err });
});

module.exports = app;