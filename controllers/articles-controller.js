const {
  fetchArticleById,
  patchingArticleById,
  postingCommentByArticleId,
  fetchCommentsByArticleId,
  fetchAllArticles,
} = require("../models/articles-model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((Article) => {
      res.send({ Article });
    })
    .catch(next);
};
exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  patchingArticleById(article_id, inc_votes)
    .then(([Article]) => {
      res.send({ Article });
    })
    .catch(next);
};
exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;
  postingCommentByArticleId(article_id, body)
    .then((Article) => {
      res.send({ Article });
    })
    .catch(next);
};
exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchCommentsByArticleId(article_id, sort_by, order)
    .then((comments) => {
      res.send({ comments });
    })
    .catch(next);
};
exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchAllArticles(sort_by, order, author, topic).then((object) => {
    res.send(object);
  });
};
