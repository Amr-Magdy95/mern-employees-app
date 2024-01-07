const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Resource not found!" });
};
