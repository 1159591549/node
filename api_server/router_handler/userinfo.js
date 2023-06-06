const db = require('../db/index')
const bcrypt = require("bcryptjs")
// 查看用户信息
exports.getUserInfo = (req, res) => {
    const sql = 'select * from ev_user where id = ?'
    db.query(sql, req.user.id, (err, result) => {
        if (err) return res.cc('数据库查询错误')
        if (result.length !== 1) return res.cc('未查到该用户信息')
        return res.cc({
            status: '0',
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}
// 修改用户信息
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_user set ? where id = ?'
    db.query(sql, [req.body, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc('用户信息更新失败')
        return res.cc('用户信息更新成功', 0)
    })
}
// 修改密码
exports.updatePassword = (req, res) => {
    let checkVip = 'select * from ev_user where id = ?'
    db.query(checkVip, req.user.id, (err, result) => {
        if (err) return req.cc(err)
        if (result.length === 0) return res.cc('该用户不存在')
        if (bcrypt.compareSync(req.body.oldPwd, result[0].password)) {
            let modifyPwdSql = 'update ev_user set password = ? where id = ?'
            db.query(modifyPwdSql, [bcrypt.hashSync(req.body.newPwd, 10), req.user.id], (err, result) => {
                console.log(result);
                if (err) return req.cc(err)
                if (result.length === 0) return res.cc('修改密码失败')
                res.cc('修改密码成功')
            })
        } else {
            return res.cc('旧密码错误!')
        }
    })
}
// 修改密码
exports.updateAvatar = (req, res) => {
    let sql = "update ev_user set user_pic = ? where id = ?"
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('头像上传失败')
        return res.cc("头像更新成功",0)
    })
}