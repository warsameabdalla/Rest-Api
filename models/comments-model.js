const connection = require("../db/connection");

exports.patchingComments = (inc_votes = 0, comment_id) => {
  return connection("comments")
    .increment("votes", inc_votes)
    .where("comment_id", "=", comment_id)
    .returning("*")
    .then((comment) => {
      if (!comment[0]) {
        return Promise.reject({ status: "404", msg: "route not found" });
      }
      return comment;
    });
};
exports.deletingComments = (comment_id) => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then((deletedComment) => {
      if (!deletedComment) {
        return Promise.reject({ status: "404", msg: "route not found" });
      }
    });
};
