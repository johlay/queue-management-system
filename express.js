/**
 * Express HTTP server
 */

// Setup
const express = require("express");
const app = express();

// Middleware that parses JSON
app.use(express.json());

// Middleware that recognize the incoming Request Object as strings or arrays.
app.use(express.urlencoded({ extended: false }));

app.use("/", require(".route/index"));

module.exports = app;
