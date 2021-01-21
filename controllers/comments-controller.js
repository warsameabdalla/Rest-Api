const { response } = require("express");
const {
  patchingComments,
  deletingComments,
} = require("../models/comments-model");

exports.patchComments = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  patchingComments(inc_votes, comment_id)
    .then(([comment]) => {
      res.send({ comment });
    })
    .catch(next);
};
exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  deletingComments(comment_id)
    .then((deletedComment) => {
      res
        .status(204)
        .send({ msg: `your ${deletedComment} message was deleted` });
    })
    .catch(next);
};
