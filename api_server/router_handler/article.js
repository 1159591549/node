const db = require("../db/index")
exports.getArticle = (req, res) => {
    const sql = "select * from ev_article_cate where is_delete = 0 order by id asc"
    db.query(sql, (err, result) => {
        if (err) return res.cc('没有这个表')
        return res.cc({
            status: 1,
            message: '获取文章信息成功',
            data: result
        })
    })
}
exports.addArticleCate = (req, res) => {
    const sql = "select * from ev_article_cate where name = ?"
    db.query(sql, [req.body.name], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows === 2) {
            return res.cc('name和alias重复')
        }
        if (result.affectedRows === 1 && result.name === req.body.name) {
            return res.cc('name重复')
        }
        if (result.affectedRows === 1 && result.alias === req.body.alias) {
            return res.cc('alias重复')
        }
        let addSql = 'insert into ev_article_cate(name, alias, is_delete) values(?, ?, 0)'
        db.query(addSql, [req.body.name, req.body.alias], (err, addRes) => {
            console.log(err);
            if (err) return res.cc(err)
            if (addRes.affectedRows === 1) {
                return res.cc("添加成功!")
            } else {
                return res.cc("添加失败!")
            }
        })
    })
}
exports.deleteArticleCate = (req, res) => {
    let deleteSql = "update ev_article_cate set is_delete = 1 where id = ?"
    db.query(deleteSql, req.body.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows === 0) return res.cc("当前ID不存在")
        return res.cc("删除成功")
    })
}
exports.getArticleCateById = (req, res) => {
    let sql = "select * from ev_article_cate where is_delete = 0 and id = ?"
    db.query(sql, req.body.id, (err, result) => {
        console.log(result);
        if (err) return res.cc(err)
        if (result.length === 0) return res.cc("暂未发现该数据")
        res.cc({
            statue: 1,
            data: result[0]
        })
    })
}
exports.updateArticleById = (req, res) => {
    let sql = "select * from ev_article_cate where id = ? and (name = ? or alias = ?)"
    db.query(sql, [req.body.id, req.body.name, req.alias], (err, result) => {
        if (err) return res.cc(err)
        // 分类名称 和 分类别名 都被占用
        if (result.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分类名称 或 分类别名 被占用
        if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
    })
    const sqlUpdate = `update ev_article_cate set ? where Id=?`
    db.query(sqlUpdate, [req.body, req.body.Id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
        // 更新文章分类成功
        res.cc('更新文章分类成功！', 0)
    })
}
exports.add = (req,res) => {
    return res.cc('发布成功')
}