// 导入express
const express  = require('express')
const path = require('path')
// 创建express实例
const app = new express()
// 监听客户端的get请求并做出回应
// 匹配请求中的路径并做出回应
// app.get('/user',(request,response) => {
//     let {name,age} = request.query
//     response.send({name,age})
// })
app.use('/clockExample',express.static(path.join(__dirname,'../clockExample')))
// // 动态参数
// app.get('/user/:id/:name',(request,response) => {
//     console.log('动态参数id:' + request.params.id);
//     console.log('动态参数name:' + request.params.name);
// })
// // 监听客户端的post请求并做出回应
// // 匹配请求中的路径并做出回应
// app.post('/man/:id/:name',(request,response) => {
//     console.log(request.params);
//     response.send('那个男人')
// })
// 监听客户端的post请求
app.listen(80,() => {
    console.log('express is publish on http://127.0.0.1');
})