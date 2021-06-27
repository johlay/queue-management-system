/**
 * Queues routes
 */

const express = require("express");
const router = express.Router();
const queues = require("../controllers/queue_controller");

/* Get all rooms */
router.get("/", queues.queue_list);

/* Get a room */
router.get("/:queueId", queues.queue_detail);

/* Add user to a room */
router.post("/:queueId/user", queues.addUser);

/* Delete a user from a room */
router.delete("/:queueId/user/:userId", queues.removeUser);

module.exports = router;
