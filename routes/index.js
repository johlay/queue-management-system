/**
 * Express Routes
 */

const express = require("express");
const router = express.Router();

// JWT token
const { extractToken } = require("@permettezmoideconstruire/express-jwt");

// Controllers
const authController = require("../controllers/auth_controller");

// Auth - Middleware
const { validateJwtToken } = require("../controllers/middleware/auth");

// Route - sxtract token
router.use(extractToken());

router.get("/", (req, res) => {
  res.json({ status: "success" });
});

router.post("/login", authController.login);
router.post("/register", authController.register);

// To protect route for "/queues" - we implement an array [] by using "verifyToken()"
router.use("/queues", [validateJwtToken], require("./queues"));

module.exports = router;
