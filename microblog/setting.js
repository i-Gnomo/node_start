module.exports = {
    cookieSecret: 'microblogbyvoid',
    db: 'microblog',
    host: 'localhost',
    port: 27017,
    url: 'mongodb://localhost:27017/microblog'
}

//登录注册图形验证码 (使用geetest 极验nodejs api)
//邮箱认证功能
//保证注册账号的有效性

//支持OAuth第三方账号登录 微博 微信 QQ
// 1-强绑定 授权后需要用户绑定自己的账号（京东 小米）
// 2-非强绑 授权后给用户生成一个账号或者调用第三方账号昵称，无需绑定账号（今日头条 知乎）

//对发帖进行限制

//帖子显示数量 分页

//用户关注 转帖 评论 圈点

//查询数据库限制 访问频繁的页面缓存

//日志

//多线程提高吞吐量

//反向代理 实现基于域名的端口共享