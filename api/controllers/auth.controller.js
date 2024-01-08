const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/CustomAPIError.error");
const { validationResult, matchedData } = require("express-validator");

exports.register = async (req, res) => {
  // receiving validation errors
  let errors = validationResult(req);
  if (!errors.isEmpty())
    throw new CustomAPIError(
      errors
        .array()
        .map((err) => err.msg)
        .join(", "),
      StatusCodes.BAD_REQUEST
    );
  let data = matchedData(req);
  // checking whether user is already registered
  const duplicate = await User.findOne({ username: data.username }).exec();
  if (duplicate)
    throw new CustomAPIError("User already registered", StatusCodes.CONFLICT);

  // registering new user
  const result = await User.create(data);
  const { password: hashedPw, ...rest } = result._doc;
  res.status(StatusCodes.CREATED).json(rest);
};

exports.login = async (req, res) => {};
exports.logout = async (req, res) => {};
exports.refreshToken = async (req, res) => {};
