exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlCodes = ["22P02", "42703", "23502", "23503"];
  if (psqlCodes.includes(err.code)) {
    res.status(400).send({ msg: err.msg || "bad request" });
  }
  next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};
