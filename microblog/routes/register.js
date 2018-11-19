var crypto = require('crypto');
var express = require('express');
var router = express.Router();

var User = require('../models/user');
var SendEmail = require('../models/sendemail');

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录');
        return res.redirect('/');
    }
    next();
}

router.get('/', checkNotLogin);
router.get('/', function(req, res, next) {
    res.render('register', { title: 'register' });
});

router.post('/', checkNotLogin);
router.post('/', function(req, res, next) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/register');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var codemd5 = crypto.createHash('md5');
    var usercode = codemd5.update(req.body.username).digest('base64'); //账户识别码 邮箱验证时使用

    var newUser = new User({
        name: req.body.username,
        password: password,
        usercode: usercode,
        datetime: Date.now(), //获取时间戳 邮箱验证时使用
        islive: false //判断账号是否激活 新注册账号默认false
    });

    //检查用户名是否已经存在
    User.get(newUser.name, function(err, user) {
        if (user && user.islive)
            err = 'Username already exists.';
        if (err) {
            req.flash('error', err);
            return res.redirect('/register');
        }
        //如果不存在则新增用户
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                //出错
                return res.redirect('/register');
            }
            // req.session.user = newUser;
            SendEmail({
                name: req.body.username,
                usercode: usercode
            });
            req.flash('success', '已向您注册时填写的邮箱发送了验证邮件，请及时登录邮箱激活账号！激活成功后可正常登录。');
            return res.redirect('/');
        });
    });
    // res.render('register', { title: 'register' });
});

module.exports = router;