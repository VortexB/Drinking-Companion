const shotButton=document.getElementById("shotbtn");
const drinkText=document.getElementById("drink-text");
const roomName= document.getElementById("room-name");
const usersList= document.getElementById("users");

const socket = io();

//get username and room

const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});


socket.emit("joinRoom",{username,room});

socket.on("roomUsers", ({room,users}) =>{
    outputRoomName(room);
    outputUsers(users);
});
socket.on("drinkType",type=>{
    drinkText.innerText=type;
});

socket.on("debug",msg=>{
    console.log(msg);
});

shotButton.addEventListener("click", e =>{
    e.preventDefault();
    let type= "shot"
    socket.emit("drinkType",type)
});

function outputRoomName(room){
    roomName.innerText=room;
}
function outputUsers(users){
    usersList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join("")}
    `;
}