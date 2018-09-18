var express = require('express');
var router = express.Router();

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        return res.redirect('/login');
    }
    next();
}

router.get('/', checkLogin);
router.get('/', function(req, res, next) {
    req.session.user = null;
    req.flash('success', '退出登录成功');
    res.redirect('/');
});

module.exports = router;