var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); //第三方中间件
var logger = require('morgan');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var flash = require('connect-flash');

var dbSet = require('./setting');

//另一种方法连接数据库
// const insertDocuments = function(db, callback) {
//     const collection = db.collection('documents');
//     collection.insertMany([
//         { a: 1 }, { a: 2 }, { a: 3 }
//     ], function(err, result) {
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     });
// }

// const MongoClient = require('mongodb').MongoClient;
// MongoClient.connect(dbSet.url, { useNewUrlParser: true }, function(err, client) {
//     console.log(client);
//     if (err) throw err
//     console.log("Connected successfully to server");
//     const db = client.db(dbSet.db);
//     insertDocuments(db, function() {
//         client.close();
//     });
// });

//加载路由模块
var indexRouter = require('./routes/index'); //首页
var usersRouter = require('./routes/user'); //用户
var postRouter = require('./routes/post'); //发表信息
var regRouter = require('./routes/register'); //注册
var loginRouter = require('./routes/login'); //登录
var quitRouter = require('./routes/quit'); //退出
var birds = require('./routes/birds');

//express实例
var app = express();
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express内置的express.static可托管静态文件
app.use(express.static(path.join(__dirname, 'public')));
//所有文件的路径都相对于存放目录 因此，存放静态文件的目录名不会出现在 URL 中。
//http://localhost:3000/stylesheets/style.css

// app.use('/static',express.static(path.join(__dirname, 'public')));
//http://localhost:3000/static/stylesheets/style.css

//__dirname
//__filename

//加载用于解析cookie的中间件
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: dbSet.cookieSecret,
    key: dbSet.db,
    cookie: { maxAge: 1000 * 60 * 60 },
    store: new MongoStore({
        url: dbSet.url
    })
}));

//flash
app.use(flash());
//设置flash
app.use(function(req, res, next) {
    res.locals.session = req.session || "";
    res.locals.error = req.flash('error') || "";
    res.locals.success = req.flash('success') || "";
    next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/post', postRouter);
app.use('/register', regRouter);
app.use('/login', loginRouter);
app.use('/quit', quitRouter);

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

//极验验证 拼图验证码
var slide = require('./routes/slide');
app.get("/gt/register-slide", function(req, res) {

    // 向极验申请每次验证所需的challenge
    slide.register(null, function(err, data) {
        if (err) {
            console.error(err);
            res.status(500);
            res.send(err);
            return;
        }

        if (!data.success) {
            // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
            // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

            // 为以防万一，你可以选择以下两种方式之一：

            // 1. 继续使用极验提供的failback备用方案
            req.session.fallback = true;
            res.send(data);

            // 2. 使用自己提供的备用方案
            // todo

        } else {
            // 正常模式
            req.session.fallback = false;
            res.send(data);
        }
    });
});
app.post("/gt/validate-slide", function(req, res) {

    // 对ajax提供的验证凭证进行二次验证
    slide.validate(req.session.fallback, {
        geetest_challenge: req.body.geetest_challenge,
        geetest_validate: req.body.geetest_validate,
        geetest_seccode: req.body.geetest_seccode
    }, function(err, success) {

        if (err) {
            // 网络错误
            res.send({
                status: "error",
                info: err
            });

        } else if (!success) {

            // 二次验证失败
            res.send({
                status: "fail",
                info: '登录失败'
            });
        } else {

            res.send({
                status: "success",
                info: '登录成功'
            });
        }
    });
});

module.exports = app;