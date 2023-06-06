// 中间件的作用
const express = require('express')
const app = express()
// 定义一个中间件
const middleWare = (req,res,next) => {
    req.startTime = new Date()
    // 中间件的末尾执行next函数
    next()
}
// 将中间件注册全局使用
app.use(middleWare)

app.get('/middleWare',(req,res) => {
    // 访问在中间件中定义的在req中的变量
    res.send('调用了中间件,执行时间为' + req.startTime)
})
app.listen(80,() => {
    console.log('server is running on http://127.0.0.1');
})