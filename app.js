let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#newmsg");
let turno = true;
let count=0;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(turno){
            box.innerText = "O";
            turno = false;
        }
        else{
            box.innerText = "X";
            turno = true;
        }
        box.disabled=true;
        let iswinner = checkWinner();
        count++;
        if(count === 9 && !iswinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerHTML = `Game was a Draw`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const resetGame = () =>{
    turno = true;
    enableboxes();
    msgcontainer.classList.add("hide");
}

const enableboxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

const disableboxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) =>{
    msg.innerHTML = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const checkWinner = ()=>{
    for(let win of winPatterns){
        let pos1 = boxes[win[0]].innerText;
        let pos2 = boxes[win[1]].innerText;
        let pos3 = boxes[win[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
                return true;
            }
        }
    }
};

newbtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);