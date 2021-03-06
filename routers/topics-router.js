const express = require("express");
const topicsRouter = express.Router();
const { getAllTopics } = require("../controllers/topics-controller");

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
