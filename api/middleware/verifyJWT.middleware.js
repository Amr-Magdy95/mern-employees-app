const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWT;
