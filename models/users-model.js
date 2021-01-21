const connection = require("../db/connection");

exports.fetchUserById = (username) => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({ status: "404", msg: "route not found" });
      } else {
        return user;
      }
    });
};
