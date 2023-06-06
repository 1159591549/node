const express = require('express')
// 注意这个地方是执行express中的Router()函数
const router = express.Router()
// 这个地方是使用router对象注册
router.get('/',(req,res) => {
    res.send('get请求')
})
router.post('/',(req,res) => {
    res.send('post请求')
})
// 导出路由
module.exports = router