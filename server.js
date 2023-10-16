const express = require("express");
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

io.on('connection', (socket) => {
    console.log('a user connected');
});

module.exports = {http, app, io};