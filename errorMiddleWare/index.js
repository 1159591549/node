// 全局生效的中间件
const express = require('express')
const app = express()
// 局部注册中间件
app.get('/middleWare', (req, res) => {
    throw new Error('主动抛出错误!')
    res.send('调用了中间件')
})
// 注册错误中间件
app.use((err,req,res,next) => {
    console.log('有异常');
    res.send(err.message)
})
app.listen(80, () => {
    console.log('server is running on http://127.0.0.1');
})