const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/CustomAPIError.error");
const { validationResult, matchedData } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  console.log(data);
  // checking whether user is already registered
  const duplicate = await User.findOne({ username: data.username }).exec();
  if (duplicate)
    throw new CustomAPIError("User already registered", StatusCodes.CONFLICT);

  // registering new user
  const result = await User.create(data);
  const { password: hashedPw, ...rest } = result._doc;
  res.status(StatusCodes.CREATED).json(rest);
};

exports.login = async (req, res) => {
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
  // checking the validity of user credentials
  const foundUser = await User.findOne({ username: data.username }).exec();
  if (!foundUser)
    throw new CustomAPIError("Invalid Credentials!", StatusCodes.UNAUTHORIZED);
  const match = await bcryptjs.compare(data.password, foundUser.password);
  if (!match)
    throw new CustomAPIError("Invalid Credentials!", StatusCodes.UNAUTHORIZED);
  console.log("here");

  // logging in user
  const accessToken = foundUser.createAccessToken();
  const refreshToken = foundUser.createRefreshToken();
  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24,
  });
  const roles = Object.values(foundUser.roles).filter(Boolean);

  res.json({ accessToken, roles });
};

exports.logout = async (req, res) => {
  // On the client side, delete the access token and cookie
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(StatusCodes.NO_CONTENT);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (foundUser) {
    foundUser.refreshToken = "";
    await foundUser.save();
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(StatusCodes.NO_CONTENT);
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(StatusCodes.FORBIDDEN);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username)
      return res.sendStatus(StatusCodes.FORBIDDEN);
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = foundUser.createAccessToken();
    res.json({ roles, accessToken });
  });
};
