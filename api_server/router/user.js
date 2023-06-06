const express = require('express')
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
const userHandler = require('../router_handler/user')
const router = express.Router()

router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

module.exports = router