var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
    var name = req.query.name;
    var usercode = req.query.usercode;
    User.get(name, function(err, user) {
        if (!user) {
            req.flash('error', '账户' + user.name + '不存在，请注册！');
            return res.redirect('/');
        }
        if (user.usercode != usercode) {
            req.flash('error', '激活失败，请重新注册！');
            return res.redirect('/');
        }

        if (user.islive) {
            req.flash('success', user.name + '账号已经激活，请登录！');
            return res.redirect('/');
        }

        var _nowtime = Date.now();
        var _nowhours = (_nowtime - parseInt(user.datetime)) / 60 / 60;
        //判断事件戳毫秒差值是否在24小时之内
        if (_nowhours >= 24) {
            req.flash('error', '激活邮件已失效，请重新注册并激活账号！');
            return res.redirect('/');
        }

        var upUser = new User({
            name: user.name,
            password: user.password,
            usercode: user.usercode,
            datetime: _nowtime, //获取时间戳 邮箱验证时使用
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