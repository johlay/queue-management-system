/**
 * Auth controller
 */

// Debugger
const debug = require("debug")("quiz-management-system:auth-controller");

// POST - login an user
const login = async (req, res) => {
  res.status(405).send({ status: "error", message: "Not Implemented." });
};

// POST - register an user.
const register = async (req, res) => {
     res.status(405).send({ status: "error", message: "Not Implemented." });
};

module.exports = { login, register };
