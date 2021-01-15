const connection = require("../db/connection");
const knexfile = require("../knexfile");
console.log("hello");
exports.fetchArticles = (articleID) => {
  return connection
    .select("articles.*")
    .count("comment_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", "=", articleID)
    .groupBy("articles.article_id")
    .then((article) => {
      return article;
    });
};
exports.fetchUpdatedArticles = (articleID, inc_votes) => {
  return connection("articles")
    .increment("votes", inc_votes)
    .where("article_id", "=", articleID)
    .returning("*")
    .then((article) => {
      return article;
    });
};
exports.postedArticles = (articleID, body) => {
  return connection("comments")
    .insert(body)
    .returning("*")
    .then((article) => {
      return article;
    });
};
exports.fetchSelectedArticles = (
  articleID,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection("comments")
    .select("*")
    .where("article_id", "=", articleID)
    .orderBy(sort_by, order)
    .then((article) => {
      return article;
    });
};
exports.fetchAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic
) => {
  console.log(author);
  return connection
    .select("articles.*")
    .orderBy(sort_by, order)
    .count("comment_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .modify((queryBuilder) => {
      if (author) {
        queryBuilder.where({ "articles.author": author });
      }
      if (topic) {
        queryBuilder.where({ " articles.topic": topic });
      }
    })
    .then((Articles) => {
      return Articles;
    });
};
