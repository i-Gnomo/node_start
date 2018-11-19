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
    // md5加密 将密文转为Base64的字符串
    // var md5 = crypto.createHash('md5');
    // var md5_base64Str = md5.update('zhangshaoxuan').digest('base64');
    res.render('login', { title: 'login' });
});

router.post('/', checkNotLogin);
router.post('/', function(req, res, next) {
    var password = req.body.password;
    User.get(req.body.username, function(err, user) {
        if (!user) {
            res.send({
                status: "error",
                info: '该账户不存在'
            });
            return;
        }
        if (!user.islive) {
            res.send({
                status: "error",
                info: '账号未激活，请查看激活邮件！'
            });
            return;
        }
        if (user.password != password) {
            res.send({
                status: "error",
                info: '密码输入错误'
            });
            return;
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.send({
            status: "success",
            info: '登录成功'
        });
        return;
    });

});

module.exports = router;