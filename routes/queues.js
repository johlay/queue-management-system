/**
 * Queues routes
 */

const express = require("express");
const router = express.Router();

// Import controller
const queueController = require("../controllers/queue_controller");

/* Get all rooms */
router.get("/", queueController.queue_list);

/* Get a room */
router.get("/:queueId", queueController.queue_detail);

/* Add user to a room */
router.post("/:queueId/user", queueController.addUser);

/* Delete a user from a room */
router.delete("/:queueId/user/:userId", queueController.removeUser);

module.exports = router;
