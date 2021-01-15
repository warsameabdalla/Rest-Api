const { response } = require("express");
const {
  patchedComments,
  deletedComments,
} = require("../models/comments-model");

exports.patchComments = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  patchedComments(inc_votes, comment_id).then(([comment]) => {
    res.send(comment);
    console.log("gfc");
  });
};
exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  console.log(comment_id);
  deletedComments(comment_id).then((deletedComment) => {
    console.log(deletedComment);
    res.status(204).send({ msg: `your ${deletedComment} message was deleted` });
  });
};
