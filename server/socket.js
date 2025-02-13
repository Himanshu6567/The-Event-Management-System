const { Server } = require("socket.io");
require("dotenv").config();
let io;

function initializeSocket(server) {
  //create server
  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL ||
        "https://the-event-management-frontend.vercel.app",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinEvent", (data) => {
      io.emit("joinEvent", { data });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  return io;
}

function getSocketIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

module.exports = { initializeSocket, getSocketIO };
