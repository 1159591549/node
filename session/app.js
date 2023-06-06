const express = require('express')
const session = require('express-session')
const app = express()
app.use(session({
    secret: 'huzhiyao',
    resave: false,
    saveUninitialized: true
}))
// app.use(express.static())
// 解析post提交过来的表单数据
app.use(express.urlencoded({ extended: false }))
app.post('/api/login', (req, res) => {
    if (req.body.username !== 'admin' || req.body.password !== '000000') {
        return res.send({ status: 1, msg: '登录失败' })
    }
    // 只有配置了express-session的中间件之后，才能通过req点出来session的属性
    if (req.session.isLogin) {
        res.send({ status: 0, msg: '你已经登录，请不要重复登录'})
    }else{
        req.session.user = req.body
        req.session.isLogin = true
        res.send({ status: 0, msg: '登录成功'})
    }
})
app.get('/api/username', (req, res) => {
    if (req.session.isLogin) {
        return res.send({
            status: 0,
            msg: 'success',
            username: req.session.user.username
        })
    }else{
        res.send("请先登录")
    }
})
app.post('/api/logout', (req, res) => {
    req.session.destroy()
    res.send({
        status: 0,
        msg: '退出登录成功'
    })
})
app.listen(80, () => {
    console.log("server is running on http://127.0.0.1");
})