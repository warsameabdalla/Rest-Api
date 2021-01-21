const express = require("express");
const { removeAllListeners } = require("../app");
const articlesRouter = express.Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId,
  getAllArticles,
} = require("../controllers/articles-controller");
const articles = require("../db/data/test-data/articles");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);
articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);
articlesRouter.route("/").get(getAllArticles);
module.exports = articlesRouter;
