import socketIOClient from "socket.io-client";

// Might re-locate to a "config" file. For JSON token?
const endpoint = "http://127.0.0.1:3001";

// Creating a instance of socketIoClient.
const socket = socketIOClient(endpoint);

export default socket;
