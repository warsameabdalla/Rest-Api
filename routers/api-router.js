const express = require('express');
const apiRouter = express().Router;
console.log(apiRouter);
const topicsRouter = require('./topics-router');

app.use('/topics', topicsRouter);

module.exports = apiRouter;
