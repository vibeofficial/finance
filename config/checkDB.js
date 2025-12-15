const mongoose = require("mongoose");
const appError = require("../utils/appError");

const checkDBConnection = (req, res, next) => {
  const state = mongoose.connection.readyState;
  if (state !== 1) return next(new appError('Service unavailable. Please try again later', 503))
  next();
};

module.exports = checkDBConnection;