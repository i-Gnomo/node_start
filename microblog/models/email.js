var nodemailer = require('nodemailer');
//创建一个SMTP客户端配置
var config = {
        host: 'smtp.163.com',
        port: 465,
        auth: {
            user: 'zsx_blog@163.com',
            pass: 'zsxblog123456' //授权码
        }
    }
    //创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

function SendYourEmail(mail) {
    transporter.sendMail(mail, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
}

module.exports = SendYourEmail;