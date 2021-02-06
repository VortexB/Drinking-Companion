const shotButton=document.getElementById("shotbtn");
const drinkText=document.getElementById("drink-text");

const socket = io();

socket.on("message",message=>{
    console.log(message);
});

socket.on("drinkType",type=>{
    drinkText.innerText=type;
});

shotButton.addEventListener("click", e =>{
    e.preventDefault();
    let type= "shot"

    socket.emit("drinkType",type)
});