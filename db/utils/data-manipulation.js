// extract any functions you are using to manipulate your data, into this file
const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

function formatDate(timestamp) {
  const jsDate = new Date(timestamp);
  return jsDate;
}

function formattedArticleData(userData) {
  for (let i = 0; i < userData.length; i++) {
    let formatted = formatDate(userData[i].created_at);
    userData[i].created_at = formatted;
  }
  return userData;
}
function createReferenceObject(arrayOfArticleData) {
  var referenceObject = {};
  for (let i = 0; i < arrayOfArticleData.length; i++) {
    referenceObject[arrayOfArticleData[i].title] =
      arrayOfArticleData[i].article_id;
  }
  console.log(referenceObject);
  return referenceObject;
}
function formattedcommentData(commentsData, referenceObject) {
  for (let i = 0; i < commentsData.length; i++) {
    let formatted = formatDate(commentsData[i].created_at);
    commentsData[i].created_at = formatted;
    commentsData[i].article_id = referenceObject[commentsData[i].belongs_to];
    commentsData[i].author = commentsData[i].created_by;
    delete commentsData[i].created_by;
    delete commentsData[i].belongs_to;
  }
  return commentsData;
}

module.exports = {
  formatDate,
  formattedArticleData,
  createReferenceObject,
  formattedcommentData,
};
