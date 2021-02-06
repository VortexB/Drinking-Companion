const express = require("express");
const http = require("http");
const path = require("path");
const socketio= require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,"public")));
io.on("connection", socket=>{
    console.log("Connection");
    socket.emit("message","Welcome to Drink With Me");//connecting client
    socket.broadcast.emit();//all useser but connect
    socket.on("disconnect",()=>{
        io.emit("message","")
    })

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT,() =>console.log(`Server running on port ${PORT}`))