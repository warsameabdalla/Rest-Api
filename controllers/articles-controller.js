const {
  fetchArticles,
  fetchUpdatedArticles,
  postedArticles,
  fetchSelectedArticles,
  fetchAllArticles,
} = require("../models/articles-model");

exports.getArticles = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticles(article_id).then(([Article]) => {
    res.send(Article);
  });
};
exports.updatedArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  fetchUpdatedArticles(article_id, inc_votes).then(([Article]) => {
    res.send(Article);
  });
};
exports.postArticles = (req, res, next) => {
  console.log("hello");
  const { article_id } = req.params;
  const body = req.body;
  postedArticles(article_id, body).then(([Article]) => {
    res.send(Article);
  });
};
exports.getSelectedArticles = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchSelectedArticles(article_id, sort_by, order).then((object) => {
    res.send(object);
  });
};
exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  console.log(author);
  fetchAllArticles(sort_by, order, author, topic).then((object) => {
    res.send(object);
  });
};
