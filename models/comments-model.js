const connection = require("../db/connection");

exports.patchedComments = (inc_votes = 0, comment_id) => {
  return connection("comments")
    .increment("votes", inc_votes)
    .where("comment_id", "=", comment_id)
    .returning("*")
    .then((comment) => {
      return comment;
    });
};
exports.deletedComments = (comment_id) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then((h) => {
      return h;
    });
};
