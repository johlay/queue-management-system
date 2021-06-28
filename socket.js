/**
 * Socket.IO server
 */

const debug = require("debug")("queue-management-system:socket");
const queues = {};

// JWT
const jwt = require("jsonwebtoken");

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

// Remove user from a queue.
function removeUserFromQueue(queue, socketId) {
  // remove user from the queue's waiting list.
  const waitingList = getWaitingListForQueue(queue).filter(
    (user) => user.socketId !== socketId
  );
  setWaitingListForQueue(queue, waitingList);

  // send the updated waiting list to all other users in the queue.
  io.to(queue).emit("updated-waiting-list", {
    queue,
    waitingList,
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

// Set waiting list for queue.
function setWaitingListForQueue(queue, waitingList) {
  return (queues[queue].waitingList = waitingList);
}

// Handle when user disconnects.
function handleUserDisconnect() {
  debug(`Client ${this.id} disconnected`);

  const queue = Object.keys(queues).find((queue) =>
    queues[queue].waitingList.find((user) => user.socketId === this.id)
  );

  if (queue) {
    debug(`Found socket still in queue '${queue}', removing...`);
    removeUserFromQueue(queue, this.id);
  }
}

// Handle when user is requesting to join a queue.
function handleJoinQueue(data, callback) {
  let payload;

  try {
    payload = jwt.verify(data.access_token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    // Calling uppon "callback" parameter to respond with failed response.
    callback({ joined: false, invalidToken: true });
  }

  // If JWT is verified and valid ...
  debug(`${payload.data.name} is requesting to join #${data.queue}.`);

  // Join queue.
  this.join(data.queue);

  // Adding user to list of waiting users (queue)
  addUserToQueue(data.queue, payload.data.name, "", this.id);

  // get list of waiting users in specific queue.
  const waitingList = getWaitingListForQueue(data.queue);

  // Send back list of users waiting in queue.
  callback({
    joined: true,
    waitingList: waitingList,
  });

  // Send the updated waiting list to all other users in the room.
  this.broadcast.to(data.queue).emit("updated-waiting-list", {
    waitingList: waitingList,
  });
}

// Handle a request to leave a queue.
function handleLeaveQueue(queue) {
  debug(`User with socketId ${this.id} wants to leave ${queue}`);

  // remove user from waiting list.
  removeUserFromQueue(queue, this.id);

  // actually leave the queue.
  this.leave(queue);
}

module.exports = function (socket) {
  io = this;
  debug(`Client ${socket.id} has connected.`);

  socket.on("disconnect", handleUserDisconnect);

  socket.on("get-waiting-list", handleGetWaitingList);

  // Listening on server side when "client" join queues.
  socket.on("join-queue", handleJoinQueue);

  socket.on("leave-queue", handleLeaveQueue);
};
