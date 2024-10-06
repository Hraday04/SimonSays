let gameSeq = [];
let userSeq = [];

let btns = ["yellow","green","blue","red"]; 

let started = false;
let level = 0;

let h2 = document.querySelector("h2"); 
 
document.addEventListener("keypress", function() {
    if(started === false){
        console.log("Game Started");
        started = true; 

        levelUp();
    }
});

function gameFlash(btn){
     btn.classList.add("flash");
     setTimeout(function(){
        btn.classList.remove("flash");
     }, 250);
};

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
       btn.classList.remove("userflash");
    }, 250);
};

function levelUp(){

    userSeq = []; 

    level++;
    h2.innerText = `Level ${level}`;  
    
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    let randomButton = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor); 
    gameFlash(randomButton);
};

function checkAns(idx){ 
    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length === gameSeq.length){
          setTimeout(levelUp(), 1000); 
       } 
    }
    else{
        wrongPlay();
        h2.innerHTML = "Game Over! Your score was " + level + ".<br> Press any key to restart.";
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 400);
        reset();
    }
}
 
function btnPress(){ 
    let btn = this; 
    userFlash(btn); 

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false; 
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function audioPlay(){
    var audio = new Audio("./click.mp3");
    audio.play();
}

function wrongPlay(){
    var audio = new Audio("./wrong.mp3");
    audio.play();
}









