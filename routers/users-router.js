const express = require("express");
const usersRouter = express.Router();
const { getUsers } = require("../controllers/users-controller");

usersRouter.route("/:username").get(getUsers);

module.exports = usersRouter;
