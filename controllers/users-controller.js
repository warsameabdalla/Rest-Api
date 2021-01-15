const { fetchUsers } = require("../models/users-model");

exports.getUsers = (req, res, next) => {
  const { username } = req.params;
  console.log(username);
  fetchUsers(username).then((Users) => {
    res.send(Users);
  });
};
