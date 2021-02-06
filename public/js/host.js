const codeText= document.getElementById("room-code-gen");
const genButton = document.getElementById("gen-btn")
function generateCode(){
    let code = "";
    for (let index = 0; index < 6; index++){ 
        let v=Math.floor(Math.random() * 10);
        code=code.concat(v.toString());    
    }  
    return code;
}

codeText.innerHTML=generateCode();
genButton.onclick = c=>codeText.innerHTML=generateCode();

function loadLobby(){
    const url = ("http://localhost:3000/" + `lobby.html?room-code=${codeText.innerText}&name=${document.getElementById("player-name").value}`);
    console.log(url);
    const form=document.getElementById("submit");
    location.href=url;

}
