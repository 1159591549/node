const express = require('express');
const router = express.Router()
const mw = (req, res, next) => {
    console.log('第四个局部中间件');
    next()
}
const mw1 = (req, res, next) => {
    console.log('路由中间件');
    next()
}
router.use(mw1)
router.get('/user/:name/:age', (req, res) => {
    let { name, age } = req.params
    res.send({
        name,
        age
    })
})
router.get('/user', mw, (req, res) => {
    let { name, age } = req.query
    res.send(`调用时间为${req.startTime},得到的返回值为姓名:${name},年龄:${age}岁`)
})
router.post('/getInfo', (req, res) => {
    let { name, age } = req.query
    res.send({
        name,
        age
    })
})
module.exports = router