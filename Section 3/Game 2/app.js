const gameArea = document.querySelector('.gameArea');
const output = document.createElement('div');
const btn = document.createElement('button');
const output1 = document.createElement('div');
const output2 = document.createElement('div');
const solutionKey = document.createElement('div');
const timeCounter  = document.createElement('div');
const minutesCounter = document.createElement('span');
const secondsCounter = document.createElement('span');
timeCounter.classList.add('clockCounter');


//

output.textContent = 'Press button to start the game';
output1.classList.add('keyz');
solutionKey.style.display = 'none';
btn.textContent = 'Start Game';
btn.style.display = 'block';
output1.style.display = 'none';
timeCounter.style.display = 'none';
//add elements to html page
timeCounter.append(minutesCounter);
timeCounter.append(document.createTextNode(':'));
timeCounter.append(secondsCounter);
output1.append(solutionKey);
gameArea.append(timeCounter);
gameArea.append(output);
gameArea.append(output2);
gameArea.append(btn);
gameArea.append(output1);

//output2.textContent = 'inputs';
//game values
//const gameWords = ['test','wow','ok'];
const gameWords = ['Hello World',"I love JavaScript","Best Game Ever"];
const game = {totalSeconds:0,inter:{},keyz:false,myPhrase:''};

window.addEventListener('DOMContentLoaded',init);

//add interaction
output1.addEventListener('click',(e)=>{
    //console.log(game.keyz);
    if(game.keyz){
        game.keyz=false;
        solutionKey.style.display = 'none';
    }else{
        game.keyz=true;
        solutionKey.style.display = 'block'; 
    }
})
btn.addEventListener('click',(e)=>{
    btn.style.display = 'none';
    startGame();
})


function startGame(){

    minutesCounter.textContent = '00';
    secondsCounter.textContent = '00';
    game.totalSeconds = 0;
    if(gameWords.length > 0){
    output1.style.display = 'block';
    timeCounter.style.display = 'block';
    game.inter = setInterval(setTimer,1000);
    gameWords.sort((el)=>{
        return 0.5 - Math.random();
    });
    game.myPhrase = gameWords.shift();
    createInputs(game.myPhrase);
    let rep = makeOutput1(game.myPhrase);
        createBoxes(rep);
    }else{
        timeCounter.style.display = 'none';
        output.textContent = "There are no more phrases."
        output2.innerHTML = 'GAME OVER';
    }
}
function createBoxes(val){
    output.innerHTML = '';
    let val1 = val.split('-');
    for(let i=0;i<val1.length;i++){
       let gameInput = document.createElement('span'); 
       gameInput.classList.add('box');
       let val2 = val1[i] == 'SPACE' ? ' ' : val1[i];
       gameInput.textContent = val2;
       output.append(gameInput);
    }
}

function createInputs(val){
    //console.log(val.length);
    output2.innerHTML = '';
    for(let i=0;i<val.length;i++){
        let playerInput = document.createElement('input');

        playerInput.setAttribute('maxlength',1);
        playerInput.classList.add('inVal');
        playerInput.guess = false;
        playerInput.v = val[i];
        if(val[i]==" "){playerInput.disabled = true;}
        output2.append(playerInput);
        playerInput.addEventListener('keydown',(e)=>{
            let regex = /[A-Za-z]/;
            if(regex.test(e.key) && e.key.length == 1)
            {playerInput.value = e.key.toUpperCase();}
            if(e.key.toUpperCase() == val[i].toUpperCase()){
                playerInput.style.borderColor = 'green';
                playerInput.guess = true;
            }else{
                playerInput.style.borderColor = 'red';
            }
        })
        playerInput.addEventListener('keyup',(e)=>{
            let regex = /[A-Za-z]/;
            if(!regex.test(e.key))
            {playerInput.value = ''}
            let val1 = e.target.nextElementSibling;
            if(val1 != null){
                if(val1.disabled == true){
                    val1 = val1.nextElementSibling;
                }
                val1.focus();
            }
            checkWinner();
        })
        playerInput.addEventListener('focus',(e)=>{
            if(!playerInput.guess) {
                playerInput.value = '';
            }
        })
        if(i==0){
            playerInput.focus();
        }
    }
}

function checkWinner(){
    let eleInputs = output2.querySelectorAll('input');
    //console.log(eleInputs);
    let holder = [];
    eleInputs.forEach((ele,index)=>{
        //console.log(ele.v);
        let val2 = (ele.v == ' ') ? ' ' : ele.value;
        holder.push(val2);
    })
    let val1 = holder.join('').toLowerCase();
    let val4 = game.myPhrase.toLowerCase();
    //console.log(val1,val4);
    if(val1 == val4){
        console.log('game over');
        endGame();
    }
}
function endGame(){
    clearInterval(game.inter);
    btn.style.display = 'block';
    output1.style.display = 'none';
    btn.textContent = 'New Game';
}




function makeOutput1(val){
    let temp = val.split('').map((ltr)=>{
        return ltr.toLowerCase().charCodeAt(0)-96;
    })
    return temp.join('-').replace(/--64-/g,'-SPACE-');
}





function init(){
    let html = '';
    for(let i=97;i<123;i++){
        let val = String.fromCharCode(i);
        ////console.log(i,val);
        html += ` (${i-96}=${val}) `;
    }
    solutionKey.innerHTML = html;
}

function setTimer(){
    game.totalSeconds++;
    secondsCounter.innerHTML = padNum((game.totalSeconds % 60));
    minutesCounter.innerHTML = padNum(Math.floor(game.totalSeconds / 60));
}

function padNum(val){
    let valString = val + "";
    if(valString.length < 2){
        return "0" + valString
    }else{
        return valString;
    }
}