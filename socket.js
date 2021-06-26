/**
 * Socket.IO server
 */

const debug = require("debug")("queue-management-system:socket");

// Handle when user disconnects.
function handleUserDisconnect() {
  debug(`Client ${this.id} disconnected`);
}

// Handle when
function handleJoinRoom({ name, location, channel }) {
  debug(`${name} is requesting to join a #${channel}.`, data);

  // Join room
  this.join(channel);

  // Adding user to list of waiting users (room)

  // Send back list of users in waiting line.

  // Send the updated waiting list to all other users in the room.
}

module.exports = function (socket) {
  io = this;
  debug(`Client ${socket.id} has connected.`);

  socket.on("disconnect", handleUserDisconnect);

  // Listening on server side when "client" join rooms.
  socket.on("join-room", handleJoinRoom);
};
