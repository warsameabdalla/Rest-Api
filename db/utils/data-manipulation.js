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

function formattedArticleData(userData) {
  // for (let i = 0; i < userData.length; i++) {
  //   let formatted = formatDate(userData[i].created_at);
  //   userData[i].created_at = formatted;
  // }
  let Data = userData.map((user) => {
    let User = { ...user };
    let formatted = formatDate(User.created_at);
    User.created_at = formatted;
    return User;
  });
  return Data;
}
function createReferenceObject(arrayOfArticleData) {
  var referenceObject = {};
  for (let i = 0; i < arrayOfArticleData.length; i++) {
    referenceObject[arrayOfArticleData[i].title] =
      arrayOfArticleData[i].article_id;
  }
  return referenceObject;
}
function formattedcommentData(commentsData, referenceObject) {
  let cd = commentsData.map((commentData) => {
    return { ...commentData };
  });
  for (let i = 0; i < cd.length; i++) {
    let formatted = formatDate(cd[i].created_at);
    cd[i].created_at = formatted;
    cd[i].article_id = referenceObject[cd[i].belongs_to];
    cd[i].author = cd[i].created_by;
    delete cd[i].created_by;
    delete cd[i].belongs_to;
  }
  return cd;
}

module.exports = {
  formatDate,
  formattedArticleData,
  createReferenceObject,
  formattedcommentData,
};
