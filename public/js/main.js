const drinkButton=document.getElementById("drinkbtn");
const drunkButton=document.getElementById("drunkbtn");
const drinkText=document.getElementById("drink-text");
const roomName= document.getElementById("room-name");
const usersList= document.getElementById("users");
const textBox= document.getElementById("text-field");
const drinkCount= document.getElementById("drink-count");

const socket = io();

//get username and room

const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true});

let counter=0;
drinkCount.innerText="Drink Count:"+counter;
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

socket.on("DoneDrink",user=>{
    userDone(user);
});

drinkButton.addEventListener("click", e =>{
    e.preventDefault();
    let type= "Default Drink";
    if(textBox.value.length>0){
        type=textBox.value;
    }
    socket.emit("drinkType",type);
});

drunkButton.addEventListener("click", e =>{
    e.preventDefault();
    removeDrink();
});


function outputRoomName(room){
    roomName.innerText="Room #:"+room;
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
    drinkText.appendChild(div);
    if(!drinkText.classList.contains("border")){
        drinkText.classList.add("border")
    }
    const users = usersList.getElementsByTagName("li");
    for (let i = 0; i < users.length; ++i) {
        users[i].classList.add("has-drink");
    }

}
function removeDrink(){
    const text =document.querySelector('.text')
    text.remove();;
    if(drinkText.classList.contains("border")&&document.querySelectorAll('.text').length==0){
        drinkText.classList.remove("border")
        socket.emit("DoneDrink");
    }
    counter++;
    drinkCount.innerText="Drink Count:"+counter;
}
function userDone(user){
    const users = usersList.getElementsByTagName("li");
    for (let i = 0; i < users.length; ++i) {
        if(users[i].innerText===user.username){
            users[i].classList.remove("has-drink");
        }
    }
}
