const db = require('../db/index')
// 加密
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { jwtSecretKey } = require('../config')

exports.regUser = (req, res) => {
    // 获取客户端提交到服务渠道额用户信息
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不合法')
    }
    const sqlStr = 'select * from ev_user where username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 判断是否报错
        if (err) {
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.cc('该用户已注册,请更换其他用户')
        }
        // 加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 定义插入新用户的语句
        const sql = 'insert into ev_user set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 判断sql执行是否成功
            if (err) {
                return res.cc(err)
            }
            // 判断插入是否成功
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: '注册用户失败'
                })
            }
            return res.cc('注册成功', 0)
        })
    })
}

exports.login = (req, res) => {
    let { username, password } = req.body
    let sql = 'select * from ev_user where username = ?'
    db.query(sql, username, (err, result) => {
        if (err) {
            return res.cc('数据查询异常')
        }
        if (result.length === 0) {
            return res.cc('你还没有注册!')
        } else {
            // 判断当前输入的密码是否和数据库的一致，第一个参数是当前输入的密码，第二个参数是数据库查出来的密码
            // 注意：bcrypt对数据加密对于相同的数据加密结果也是不一样的，不要对用户提交过来的密码加密之后再和数据库查询过来的密码比对，是肯定不行的
            // 另外注意compareSync第一个参数是用户提交过来的明文密码，第二个参数是数据库的加密密码
            let confirmPassword = bcrypt.compareSync(password, result[0].password)
            if (confirmPassword) {
                let userInfo = { ...result[0], password: '', user_pic: '' }
                const tokenStr = jwt.sign(userInfo, jwtSecretKey, { expiresIn: '10h' })
                return res.cc({
                    status: 0,
                    message: '登录成功！',
                    // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
                    token: 'Bearer ' + tokenStr,
                })
            } else {
                return res.cc('密码错误!')
            }
        }
    })
}