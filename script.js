// acessing all the button
let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newGameButton=document.querySelector(".newGame");
let winningMsg=document.querySelector(".Winning-msg");

let msg=document.querySelector("#msg");

//which player turn X or O
//player X and Player O
let turnO=true;  //player O it is player 0 chance

//storing the winning pattern using 2D array
//winning pattern are
//1st horizontol
//0-1-2,3-4-5,6,7,8
//2nd vertical
//0-3-6, 1-4-7, 2-5-8,
//3rd diagonal
//0-4-8, 2-4-6
let winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
//action needs to be performed when button is clicked

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText="O";
            
            turnO=false;
            box.disabled=true;
             // so that the box cannot change its value after one Click
        }
        else{
            box.innerHTML="<p style='color:black'>X</p>";
            
            turnO=true;
            box.disabled=true; 
           // so that the box cannot change its value after One Click
        }
        checkWinner();
        
    })
})
    const showWinner=(winner)=>{   //to display the winner
        msg.innerText=`Congratulation, Winner is ${winner}`;  
        winningMsg.classList.remove("hide");  //to activate the winner text 
    }
    const resetGame=()=>{
        turnO=true;
        enabledBoxes();
        winningMsg.classList.add("hide");  //to hide the msg Winner

    }

    const disabledBoxes=()=>{  // aftre winning the match the shuold not conitinue therefore disabled the boxes  
        for(let box of boxes){
            box.disabled=true;
        }
    }
    const enabledBoxes=()=>{  //for reset operation
        for(let box of boxes){
            box.disabled=false;
            box.innerText="";
        }
    }
//Creating function to check winners
const checkWinner = ()=>{
    let isDraw = true;
    for(let pattern of winPatterns){ //here pattern is 1D Array which contail all 3 winning position
       let pos1val=boxes[pattern[0]].innerText; //storing the value of X Or Y on the basis of pattern
       let pos2val=boxes[pattern[1]].innerText;
       let pos3val=boxes[pattern[2]].innerText;
        if(pos1val !="" && pos2val!="" && pos3val!=""){  //any box should not be empty
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("Winner",pos1val);   //printing the winner wither X or Y
                showWinner(pos1val);
                disabledBoxes();
            }
        }
    }
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; // If any box is empty, it's not a draw
        }
    });
    if (isDraw) {
        msg.innerText = "It's a Draw!"; // Show draw message
        winningMsg.classList.remove("hide");
    }
    


}
newGameButton.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
