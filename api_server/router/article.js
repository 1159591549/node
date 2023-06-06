const express = require('express')
const expressJoi = require("@escook/express-joi")
const router = express.Router()
const { getArticle, addArticleCate, deleteArticleCate, getArticleCateById, updateArticleById, add } = require("../router_handler/article")
const { add_article_cate, delete_article_cate, update_article_by_id } = require('../schema/user')
router.get("/getArticleCate", getArticle)
router.post("/addArticleCate", expressJoi(add_article_cate), addArticleCate)
router.post("/deleteArticleCate", expressJoi(delete_article_cate), deleteArticleCate)
router.get("/getArticleCateById", expressJoi(delete_article_cate), getArticleCateById)
router.post("/updateArticleById", expressJoi(update_article_by_id), updateArticleById)
router.post("/add", add)
module.exports = router