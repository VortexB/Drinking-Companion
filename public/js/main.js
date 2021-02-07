const drinkButton=document.getElementById("shotbtn");
const drunkButton=document.getElementById("drink-drunk");
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
    addDrink(type);
});

socket.on("debug",msg=>{
    console.log(msg);
});

drinkButton.addEventListener("click", e =>{
    e.preventDefault();
    let type= "shot";
    socket.emit("drinkType",type);
});

drunkButton.addEventListener("click", e =>{
    e.preventDefault();
    removeDrink();
});


function outputRoomName(room){
    roomName.innerText=room;
}
function outputUsers(users){
    usersList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join("")}
    `;
}
function addDrink(drink){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="text"> ${drink}</p>`
    document.getElementById("drink-text").appendChild(div)
}
function removeDrink(){
    document.querySelector('.text').remove();
}
