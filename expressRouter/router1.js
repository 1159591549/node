const express = require('express')
const router = express.Router()
router.get('/test',(req,res) => {
    res.send('测试路由')
})
module.exports = router