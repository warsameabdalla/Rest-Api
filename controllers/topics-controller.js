const { fetchAllTopics } = require('../models/topics-model');

exports.getTopics = (req, res, next) => {
  fetchAllTopics().then((topicsData) => {
    res.send(topicsData);
  });
};
