const express = require('express')
const app = express()
const generateToken = require('jsonwebtoken')
const expressjwt = require('express-jwt')
const secret = 'ujkojkkvergerg'

const cors = require('cors')
app.use(cors())

const bodyParse = require('body-parser')
app.use(bodyParse.urlencoded({ extended: false }))

app.use(expressjwt({ secret }).unless({ path: [/^\/api\//] }))
// 登录接口
app.post('/api/login', (req, res) => {
    if (req.query.username !== 'admin' || req.query.password !== '000000') {
        res.send({
            status: 403,
            message: '登录信息错误'
        })
    }
    let token = generateToken.sign({ username: req.query.username }, secret, { expiresIn: '15s' })
    res.send({
        status: 200,
        message: '登录成功',
        token
    })
})
app.get('/admin/getInfo', (req, res) => {
    res.send({
        status: 200,
        message: '获取用户信息成功',
        test: 'test',
        data: req.user
    })
})
app.use((error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
        res.send({
            status: 401,
            message: '无效的token'
        })
    } else {
        res.send({
            status: 500,
            message: '未知的错误'
        })
    }

})
app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})
