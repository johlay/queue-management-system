/**
 * Queues controller
 */

const debug = require("debug")("quiz-management-system:queue-controller");
const models = require("../models");

/**
 * Get all queues
 *
 * GET /queues
 */
const queue_list = async (req, res) => {
  try {
    const queues = await models.Queue.find();

    return res.send({
      status: "success",
      data: {
        queues,
      },
    });
  } catch (error) {
    debug("Exception thrown in queue_controller", error);

    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * Get a specific queue
 *
 * GET /rooms/:roomId
 */
const queue_detail = async (req, res) => {
  return res.status(405).send({ status: "error", message: "Not Implemented" });
};

/**
 * Add a user to a specific room
 *
 * POST /queues/:queueId/user
 */
const addUser = async (req, res) => {
  return res.status(405).send({ status: "error", message: "Not Implemented" });
};

/**
 * Remove a user from a specific queue
 *
 * DELETE /queues/:queueId/user/:userId
 */
const removeUser = async (req, res) => {
  return res.status(405).send({ status: "error", message: "Not Implemented" });
};

module.exports = {
  queue_list,
  queue_detail,
  addUser,
  removeUser,
};
