// 全局生效的中间件
const express = require('express')
const app = express()
// 定义一个中间件
const middleWare = (req, res, next) => {
    console.log('局部中间件被启动');
    // 中间件的末尾执行next函数
    next()
}
// 局部注册中间件
app.get('/middleWare', middleWare, (req, res) => {
    res.send('调用了中间件')
})
app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})