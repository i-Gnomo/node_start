var Send = require('../models/email');
var express = require('express');
var router = express.Router();

//创建一个邮件对象
var mail = {
    // 发件人
    from: 'microblog <zsx_blog@163.com>',
    // 主题
    subject: '[microblog]激活账号',
    // 收件人
    to: '936172012@qq.com',
    // 邮件内容，HTML格式
    text: `尊敬的小宣，您好！\n点击以下链接即可激活您的microblog网站账号,\n https://www.cnblogs.com/flashsun/p/7424071.html, \n为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 \n若如果您并未尝试修改密码，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！`
        //接收激活请求的链接 
}

router.get('/', function(req, res) {
    //request请求 response响应
    Send(mail);
    res.redirect('/');
});

module.exports = router;