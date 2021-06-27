#!/usr/bin/env node

/**
 * Module dependencies.
 */

require("dotenv").config();

// Server setup
const app = require("./express.js"); // socket.io configuration. Uses express.js file which contain HTTP server.

// Debug
const debug = require("debug")("queue-management-system:server");
const http = require("http");

// Socket.IO
const SocketIO = require("socket.io");

const port = normalizePort(process.env.PORT || "3001");
app.set("port:", port);

// Create HTTP server - (Socket.IO server).
const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: "*",
  },
});

// Using socket.js file.
io.on("connection", require("./socket.js"));

// Server - listening to provided port.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Configuration for normalizing "port" into a: string, number or false.
function normalizePort(value) {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }

  return falste;
}

// Event listener for HTTP server event: "error".
function onError(error) {
  // The name of the system call that triggered the error.
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // This handle specific server listening errors with messages.
  switch (error.code) {
    case "EACCES": {
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    }
    case "EADDRINUSE": {
      console.error(bind + " is alreadi in use.");
      process.exit(1);
      break;
    }
    default: {
      throw error;
    }
  }
}

// Event listener for HTTP server event: "listening".
function onListening() {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port " + address.port;
  debug("Listening on " + bind);
}
