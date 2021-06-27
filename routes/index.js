/**
 * Express Routes
 */

const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/auth_controller");

router.get("/", (req, res) => {
  res.json({ status: "success" });
});

router.post("/login", authController.login);
router.post("/register", authController.register);
router.use("/queues", require("./queues"));

module.exports = router;
