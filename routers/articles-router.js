const express = require("express");
const { removeAllListeners } = require("../app");
const articlesRouter = express.Router();
const {
  getArticles,
  updatedArticles,
  postArticles,
  getSelectedArticles,
  getAllArticles,
} = require("../controllers/articles-controller");
const articles = require("../db/data/test-data/articles");

articlesRouter.route("/:article_id").get(getArticles).patch(updatedArticles);
articlesRouter
  .route("/:article_id/comments")
  .post(postArticles)
  .get(getSelectedArticles);
articlesRouter.route("/").get(getAllArticles);
module.exports = articlesRouter;
