const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./controllers/error.controller");
app.use(express.json());
app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "route not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
// psqlCodes.includes(err.code)
module.exports = app;
