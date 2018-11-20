var Send = require('./email');

function SendEmail(userinfo) {
    var eurl = 'http://localhost:3000/checkemail?name=' + encodeURIComponent(userinfo.name) + '&usercode=' + encodeURIComponent(userinfo.usercode);
    //创建一个邮件对象
    var mail = {
        // 发件人
        from: 'microblog <zsx_blog@163.com>',
        // 主题
        subject: '[microblog]激活账号',
        // 收件人
        to: userinfo.name,
        // 邮件内容，HTML格式
        text: '尊敬的用户' + userinfo.name + '，您好！\n点击以下链接即可激活您的microblog网站账号，\n' + eurl +
            '\n为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 \n若如果您并未注册microblog账号，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！'
            //接收激活请求的链接 
    }
    Send(mail);
}

module.exports = SendEmail;