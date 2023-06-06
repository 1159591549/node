const express = require('express');
const moment = require('moment')
const mysql = require('mysql')
const app = express()
const db = mysql.createPool({
    host: '192.168.144.128',
    user: 'root',
    password: 'root',
    database: 'mydb'
})
let book = { title: '三国演义', author: '施耐庵' }
let sqlStr = 'select * from book where author="javaAuthor"'
// 插入
let insertStr = 'insert into book(title, author) values(?,?)'
// 便捷插入
let insertStr1 = 'insert into book set ?'
// 更新
let updateStr = 'update book set title=?,author=? where title=?'
// 便捷更新
let updateStr1 = 'update book set ? where title=?'
// 删除操作
let deleteStr = 'delete from book where author=?'
db.query(deleteStr, ["1"], (err, res) => {
    if (err) {
        console.log(err.message);
        return
    }
    // console.log(res);
})
app.listen(80, () => {
    console.log('express is running on http://127.0.0.1');
})