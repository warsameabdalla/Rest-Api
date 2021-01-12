// extract any functions you are using to manipulate your data, into this file
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

function formatDate(timestamp) {
  const jsDate = new Date(timestamp);
  return jsDate;
}

function formattedUsersData(userData) {
  for (let i = 0; i < userData.length; i++) {
    let formatted = formatDate(userData[i].created_at);
    userData[i].created_at = formatted;
  }
  return userData;
}

module.exports = { formatDate, formattedUsersData };
