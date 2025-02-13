const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
require('dotenv').config(); 

const { initializeSocket } = require("./socket");
const userRoutes = require("./routes/user");
const EventRoute = require("./routes/EventRoute");
const AllAccessRoute = require("./routes/AllAccess");
const { authMiddleware } = require("./services/auth");

const app = express();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app); //create server
const io = initializeSocket(server); //start io server

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB database", err);
  });

// Routes
app.use("/user", userRoutes);
app.use("/event", authMiddleware, EventRoute);
app.use("/", AllAccessRoute);

// Start  server
server.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
