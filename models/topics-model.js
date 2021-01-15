const connection = require("../db/connection");

exports.fetchAllTopics = (username) => {
  return connection.select("*").from("topics");
};
