const mysql = require('mysql')
const db = mysql.createPool({
    host: '192.168.15.10',
    user: 'root',
    password: 'root',
    database: 'my_db_01'
})
module.exports = db