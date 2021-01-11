const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");
const {
  formatDate,
  formattedUsersData,
} = require("../utils/data-manipulation");

exports.seed = function (knex) {
  // add seeding functionality here
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      console.log(topicData);
      return knex("topics").insert(topicData).returning("*");
    })
    .then((insertedTopics) => {
      console.log(insertedTopics);
      return knex("users").insert(userData).returning("*");
    })
    .then((insertedUsers) => {
      console.log(insertedUsers);
      for (let y of userData) {
        let formatted = formatDate(y.created_at);
        y.created_at = formatted;
      }
      let formattedData = formattedUsersData(articleData);
      return knex("articles")
        .insert(formattedData)
        .returning("*")
        .then((insertedArticle) => {
          console.log(insertedArticle);
        });
    });
};
