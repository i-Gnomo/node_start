var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
    var name = req.query.name;
    var usercode = req.query.usercode;
    User.get(name, function(err, user) {
        if (!user) {
            res.send({
                status: "error",
                info: '该账户不存在'
            });
            return;
        }
        if (user.usercode != usercode) {
            res.send({
                status: "error",
                info: '激活失败，请重新注册！'
            });
            return;
        }

        var upUser = new User({
            name: user.name,
            password: user.password,
            usercode: user.usercode,
            datetime: Date.now(), //获取时间戳 邮箱验证时使用
            islive: true
        });

        upUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                //出错
                return res.redirect('/register');
            }
            req.flash('success', '账号激活成功！请登录。');
            return res.redirect('/');
        })
    });
});

module.exports = router;