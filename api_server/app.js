const express = require('express')
const joi = require('joi')
const app = express()
const expressJwt = require("express-jwt")
const { jwtSecretKey } = require('./config')
// 这个中间件要第一个调用，以免在其他中间件之后调用影响其他中间件使用这个中间件出现问题
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
app.use(expressJwt({ secret: jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 允许接口跨域
const cors = require('cors')
app.use(cors())

// 解析表单数据
app.use(express.urlencoded({ extended: false }))

// 注册路由
const userRouter = require('./router/user')
const userInfoRouter = require('./router/userinfo')
const articleRouter = require('./router/article')
app.use('/api', userRouter)
app.use('/my', userInfoRouter)
app.use('/article', articleRouter)

// 错误中间件
app.use(function (err, req, res, next) {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    console.log(err);
    if (err.name === 'UnauthorizedError') return res.cc("身份认证失败")
    // 未知错误
    res.cc(err)
})

app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})