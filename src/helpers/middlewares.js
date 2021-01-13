const expressJwt = require("express-jwt");

function authMiddleware() {
  const secret = process.env.SECRET;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, method: ["GET", "OPTIONS"] },
      "/api/v1/users/login ",
      "/api/v1/users/register ",
    ],
  });
}

module.exports = authMiddleware;
