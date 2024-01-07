const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/CustomAPIError.error");

module.exports = (err, req, res, next) => {
  if (err instanceof CustomAPIError)
    return res.status(err.code).json({ message: err.message });
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Something went wrong, try again later!" });
};
