const expressJwt = require("express-jwt");

function authMiddleware() {
  const secret = process.env.SECRET;
  return expressJwt({ secret, algorithms: ["HS256"] });
}

module.exports = authMiddleware;
