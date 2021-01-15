const express = require("express");
const commentsRouter = express.Router();
const {
  patchComments,
  deleteComments,
} = require("../controllers/comments-controller");
commentsRouter
  .route("/:comment_id")
  .patch(patchComments)
  .delete(deleteComments);

module.exports = commentsRouter;
