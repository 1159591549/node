const express = require('express')
// 路由导入
const router = require('./router')
const router1 = require('./router1')
const app = express()
// 路由注册
app.use('/api',router)
app.use(router1)
app.listen(80,() => {
    console.log("server is running on http://127.0.0.1");

})