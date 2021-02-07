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
genButton.onclick = ()=>codeText.innerHTML=generateCode();

function loadLobby(){
    const url = ("http://" + location.host + `/lobby.html?username=${document.getElementById("player-name").value}&room=${codeText.innerText}`);
    location.href=url;

}
