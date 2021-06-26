/**
 * Socket.IO server
 */

const debug = require("debug")("queue-management-system:socket");

module.exports = function (socket) {
  io = this;
  debug(`Client ${socket.id} has connected.`);
};
