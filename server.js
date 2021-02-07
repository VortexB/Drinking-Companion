const express = require("express");
const http = require("http");
const { userInfo } = require("os");
const path = require("path");
const socketio= require("socket.io");
const {userJoin, getCurrentUser,userLeave,getRoomUsers} = require('./utils/users.js')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,"public")));

io.on("connection", socket=>{

    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);
        console.log(user.room);
        socket.broadcast.to(user.room).emit("debug","User has joined");
        
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users: getRoomUsers(user.room)
        })
    });


    socket.on("disconnect",()=>{
        const user =userLeave(socket.id);
        if(user!=null){
            io.to(user.room).emit('roomUsers',{
                room:user.room,
                users: getRoomUsers(user.room)
            })
        }
    });

    socket.on("DoneDrink",()=>{
        user=getCurrentUser(socket.id);
        if(user!=null){
            io.to(user.room).emit("DoneDrink",user);
        }
    });

    socket.on("drinkType",shot=>{
        user=getCurrentUser(socket.id);
        if(user!=null){
            io.to(user.room).emit('drinkType',shot);
        }
    });

});

const PORT = process.env.PORT||3000;

server.listen(PORT,() =>console.log(`Server running on port ${PORT}`))