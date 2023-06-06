const joi = require('joi')
// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}
// 更新用户信息验证
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
// 修改密码的校验
exports.update_password = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref("oldPwd")).concat(password)
  }
}
// 修改头像的校验
const avatar = joi.string().dataUri().required()
exports.update_avatar = {
  body: {
    avatar
  }
}
// 添加文章分类校验
const name = joi.string().required()
const alias = joi.string().alphanum().required()
exports.add_article_cate = {
  body: {
    name,
    alias
  }
}
// 删除文章类别
const deleteId = joi.number().integer().min(1).required()
exports.delete_article_cate = {
  body: {
    id: deleteId
  }
}
// 根据ID修改文章分类信息
exports.update_article_by_id = {
  body: {
    id: deleteId,
    name,
    alias
  }
}
