/**
 * Auth controller
 */

// Debugger
const debug = require("debug")("quiz-management-system:auth-controller");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
// Models
const { User } = require("../models");

// POST - login an user
const login = async (req, res) => {
  // get user from database
  let user;
  try {
    user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(403).send({
        status: "fail",
        message: "Authentication failed.",
      });
    }
  } catch (error) {
    debug(
      `Exception thrown when retrieving user '${req.body.email}' from db:`,
      error
    );
    return res.status(500).send({
      status: "fail",
      message: "Authentication failed.",
    });
  }

  // validate password against stored hash
  if (!(await bcrypt.compare(req.body.password, user.password))) {
    debug(`Password for '${req.body.email}' did not match hash:`);
    return res.status(403).send({
      status: "fail",
      message: "Authentication failed.",
    });
  }

  // Construct payload
  const payload = {
    data: user,
  };

  // Sign payload and get JWT-access-token.
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "1d",
  });

  return res.status(200).send({
    status: "success",
    data: {
      access_token,
    },
  });
};

// POST - register an user.
const register = async (req, res) => {
  debug(`User with email ${req.body.email} wants to register.`);

  let hash;

  try {
    hash = await bcrypt.hash(req.body.password, config.PASSWORD_HASH_ROUNDS);
  } catch (error) {
    debug("Exception thrown when hashing the password:", error);

    return res.status(500).send({
      status: "error",
      message: "Exception thrown when hashing the password.",
    });
  }

  // Insert user into database
  try {
    const user = await User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    });

    if (!user) {
      debug("User could not be created.");

      return res.status(500).send({
        status: "error",
        message: "Exception thrown when hashing the password.",
      });
    }

    return res.send({ status: "success", data: { user } });
  } catch (error) {
    debug("User could not be created.");

    return res.status(500).send({
      status: "error",
      message: "Exception thrown when hashing the password.",
    });
  }
};

module.exports = { login, register };
