var crypto = require('crypto');
var express = require('express');
var router = express.Router();

var User = require('../models/user');

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
    // console.log(req.body);
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/register');
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password,
    });

    //检查用户名是否已经存在
    User.get(newUser.name, function(err, user) {
        if (user)
            err = 'Username already exists.';
        if (err) {
            req.flash('error', err);
            return res.redirect('/register');
        }
        //如果不存在则新增用户
        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/register');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            return res.redirect('/');
        });
    });
    // res.render('register', { title: 'register' });
});

module.exports = router;