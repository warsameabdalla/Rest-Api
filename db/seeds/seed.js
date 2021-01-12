const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");
const {
  formatDate,
  formattedArticleData,
} = require("../utils/data-manipulation");

exports.seed = function (knex) {
  // add seeding functionality here
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicData).returning("*");
    })
    .then((insertedTopics) => {
      return knex("users").insert(userData).returning("*");
    })
    .then((insertedUsers) => {
      let formattedData = formattedArticleData(articleData);
      return knex("articles").insert(formattedData).returning("*");
    })
    .then((insertedArticle) => {
      console.log(insertedArticle);
      let formattedCommentData = formattedArticleData(commentData);
      return knex("comments").insert(formattedCommentData).returning("*");
    })
    .then((a) => {
      console.log(a);
    });
};
