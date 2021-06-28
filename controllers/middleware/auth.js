/**
 * Auth middleware.
 */

const debug = require("debug")("quiz-management-system:auth");
const jwt = require("jsonwebtoken");

const validateJwtToken = (req, res, next) => {
  // If there is no token...
  if (!req.token) {
    return res.status(401).send({
      status: "error",
      message: "No token found in request.",
    });
  }

  // validate token - req.token because of - npm package: "express-jwt" usage of "extractToken" method.
  let payload;

  try {
    payload = jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET);

    debug("Decoded and verified payload:", payload);

    // If validated - set req.user to: "payload" in request.
    req.user = payload;
  } catch (error) {
    debug("Invalid token:", req.token);
    
    return res.status(403).send({
      status: "error",
      message: "Invalid token.",
    });
  }

  next();
};

module.exports = { validateJwtToken };
