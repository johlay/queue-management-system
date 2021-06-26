/**
 * Socket.IO server
 */

const debug = require("debug")("queue-management-system:socket");

const queues = {};

// Add an user to a queue.
function addUserToQueue(queue, name, location, socketId) {
  if (typeof queues[queue] === "undefined") {
    queues[queue] = {
      waitingList: [],
    };
  }

  queues[queue].waitingList.push({
    socketId,
    name,
    location,
    waitingSince: Math.round(Date.now() / 1000),
  });
}

// Get waiting list for queue.
function getWaitingListForQueue(queue) {
  return queues[queue].waitingList;
}

// Handle get waiting list for a queue.
function handleGetWaitingList(queue, callback) {
  callback({
    queue,
    waitingList: getWaitingListForQueue(queue),
  });
}

// Handle when user disconnects.
function handleUserDisconnect() {
  debug(`Client ${this.id} disconnected`);
}

// Handle when user is requesting to join a queue.
function handleJoinQueue({ name, location, queue }, callback) {
  debug(`${name} is requesting to join #${queue}.`);

  // Join queue
  this.join(queue);

  // Adding user to list of waiting users (queue)
  addUserToQueue(queue, name, location, this.id);

  // get list of waiting users in specific queue.
  const waitingList = getWaitingListForQueue(queue);

  // Send back list of users waiting in queue.
  callback({
    queue: queue,
  });

  // Send the updated waiting list to all other users in the room.
  this.broadcast.to(queue).emit("updated-waiting-list", {
    queue: queue,
    waitingList,
  });
}

module.exports = function (socket) {
  io = this;
  debug(`Client ${socket.id} has connected.`);

  socket.on("disconnect", handleUserDisconnect);

  socket.on("get-waiting-list", handleGetWaitingList);

  // Listening on server side when "client" join rooms.
  socket.on("join-queue", handleJoinQueue);
};
