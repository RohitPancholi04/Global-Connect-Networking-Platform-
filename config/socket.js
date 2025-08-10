const {Server} = require("socket.io")
const http = require("http")
const express = require('express');

// Create HTTP server
const app = express();
const httpServer = http.createServer(app);

// Create Socket.IO server and attach it to HTTP server
const io = new Server(httpServer);

// get socket id from map
const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}

//used to store online users
const userSocketMap = {}; // {userId: socketId}


// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);


const userId = socket.handshake.query.userId;
if(userId)  userSocketMap[userId] = socket.id

//io.emit() is used to send events to all the connected clients
io.emit("getOnlineUsers" , Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));
  });
});

module.exports =  {io, app, httpServer,getReceiverSocketId};


