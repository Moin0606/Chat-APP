var express = require('express');
var app = express();
var server = require("http").createServer(app); // Create HTTP server using Express app
var io = require("socket.io")(server); // Pass the server object to socket.io

const { join } = require('path');

var users = [];
var connections = [];

server.listen(3000);

app.get("/", function(req, resp) {
    resp.sendFile(join(__dirname, "/index.html"));
});

io.on("connection", function(socket) { // Listen for connections on the io instance
    connections.push(socket);
    console.log("Connected: %s socket connected", connections.length);

    socket.on("disconnect", function() {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s socket connected", connections.length);
    });

    socket.on("send message", function(data) {
        console.log(data);
        io.emit("new message", { msg: data }); // Emit to all connected clients
    });
});

console.log("Server is listening");
