var express = require('express');
var router = express.Router();
var jade = require('jade');

var User = require('../models/user');
var Post = require('../models/post');

/* GET user listing. */
router.get('/', function(req, res, next) {
    // var tpl = jade.compile('p #{username}');
    // var html = tpl({ 'username': 'hello xiaoxuan' });
    var html = jade.render('div #{slogan}', { 'slogan': 'hahaha xiaoxuan' });
    //jade.renderFile('user2.jade',{'name': 'xuan'});
    res.write(html);
    res.end();
    //res.send 和res.end的区别
    // res.send(html);
    // res.send('respond with a resource');
});

router.use('/:user', function(req, res, next) {
    console.log('User Request:', req.params);
    next();
});

router.get('/:user', function(req, res, next) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }
        Post.get(user.name, function(err, docs) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', { title: req.params.user, data: docs });
        })
    });
});

module.exports = router;