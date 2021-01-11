// extract any functions you are using to manipulate your data, into this file
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

exports.formatDate = (timestamp) => {
  const jsDate = new Date(timestamp);
  return jsDate;
};

exports.formattedUsersData = (userData) => {
  for (let y of userData) {
    let formatted = formatDate(y.created_at);
    y.created_at = formatted;
    return userData;
  }
};
