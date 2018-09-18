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
    res.render('login', { title: 'login' });
});

router.post('/', checkNotLogin);
router.post('/', function(req, res, next) {

    console.log(req.body.password, req.body.username);
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if (!user) {
            req.flash('error', '该账户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '密码输入错误');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('success', '登录成功');
        return res.redirect('/');
    });

});

module.exports = router;