let boxes = document.querySelectorAll(".gamebutton");
let resetbutton = document.querySelector(".resetButton");
let turnX = true;
let body = document.querySelector("body");
let winnerPara = document.createElement("p");
let newGame = document.createElement("button");
let count = 0;
let drawMessage = document.createElement("p");

const winnerpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnX){
            box.style.color = " rgb(90, 0, 0)";
            box.innerText = "X";
            turnX = false;
        }
        else{
            box.style.color = "rgb(0, 90, 63)";
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

function printWinner(winner){
    winnerPara.style.fontWeight = "700";
    winnerPara.style.fontSize = "2rem";
    winnerPara.style.textDecoration = "underline";
    winnerPara.innerText = `Congratulations!!! Winner is: ${winner}`;
    body.prepend(winnerPara);
    newGame.innerText = "New Game";
    winnerPara.after(newGame);
    newGame.style.fontSize = "1.5rem";
    newGame.style.backgroundColor = "#6b6a55";
    newGame.style.padding = "0.5rem 0.7rem 0.5rem 0.7rem";
    newGame.style.borderRadius = "1rem";
    newGame.addEventListener("click",clearGame);
}


const checkWinner = ()=>{
    for(let pattern of winnerpatterns){
        let patt1Val = boxes[pattern[0]].innerText;
        let patt2Val = boxes[pattern[1]].innerText;
        let patt3Val = boxes[pattern[2]].innerText;
        if(patt1Val!="" && patt2Val!="" && patt3Val!=""){
            if(patt1Val === patt2Val && patt2Val===patt3Val){
                console.log("Winner",patt1Val);
                printWinner(patt1Val);
                for(let box of boxes){
                    box.disabled = true;
                }
            }
            if(count===9){
                drawMessage.style.fontWeight = "700";
                drawMessage.style.fontSize = "2rem";
                drawMessage.style.textDecoration = "underline";
                drawMessage.innerText = "Draw Game!!!";
                body.prepend(drawMessage);
                console.log("Draw");
            }
        }
    }
}

function clearGame(){
    for(let box of boxes){
        box.innerText = "";
        box.disabled = false;
    }
    winnerPara.remove();
    newGame.remove();
    drawMessage.remove();
    turnX = true;
    count=0;
}
resetbutton.addEventListener("click",clearGame);