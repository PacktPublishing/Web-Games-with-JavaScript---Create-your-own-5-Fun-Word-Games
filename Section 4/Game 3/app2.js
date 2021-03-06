const app = function() {
    //variables
    const gameValues = {cur:'',solution:'',correct:0,incorrect:0,total:0};
    const domEle = {};
    //const myWords = ['aaaaa','aaaal','css'];
    const myWords = ['learn javascript','learn html','learn css'];

    function init(){
         //select the DOM objects
        domEle.gameArea = document.querySelector('.gameArea');
        domEle.score =  createElements('div',domEle.gameArea,'score');
        domEle.btn =  createElements('button',domEle.gameArea,'Start Game');
        domEle.hiddenWord = createElements('div',domEle.gameArea,'secret words');
        domEle.letters =  createElements('div',domEle.gameArea,'letters');
        domEle.score.style.display = 'none';
        domEle.letters.style.display = 'none';
        domEle.hiddenWord.textContent = 'Click the button to start the hangman game';
        domEle.btn.addEventListener('click',startGame);
    }
    function startGame(){
        domEle.btn.style.display = 'none';
        if(myWords.length > 0 ){
            myWords.sort(()=>{
                return .5 - Math.random();
            })
            gameValues.total = 0;
            gameValues.correct = 0;
            gameValues.incorrect = 0;
            gameValues.cur = myWords.shift();
            gameValues.solution = gameValues.cur.split('');
            domEle.score.style.display = 'block';
            domEle.letters.style.display = 'block';
            buildBoard();
            scoreBoard();
        }
    }
    function scoreBoard(){
        let output = `${gameValues.total} letters Found(${gameValues.correct})  missed(${gameValues.incorrect})`;
        domEle.score.innerHTML = output;
        //check if winner
        if(gameValues.total == gameValues.correct ){
            gameOver();
        }
    }

    function gameOver(){
        if(myWords.length > 0 ){
            domEle.letters.style.display = 'none';
            domEle.btn.style.display = 'inline-block';
            domEle.btn.textContent = 'Next Round';
        }else{
            domEle.letters.innerHTML = 'You solved all the words<br>GAME OVER!!';
        }
        let output = `You found all ${gameValues.total} letters with ${gameValues.incorrect} missed`;
        domEle.score.innerHTML = output;
    }

    function checkLetters(val){
        //console.log(val);
        let solLetters = document.querySelectorAll('.boxE');
        let foundChecker = 0;
        solLetters.forEach((el)=>{
            //console.log(el.letter);
            if(val == el.letter.toUpperCase()){
                el.textContent = el.letter.toUpperCase();
                foundChecker++;
            }
        })
        //console.log(foundChecker);
        if(foundChecker!=0){
            gameValues.correct += foundChecker;
        }else{
            gameValues.incorrect++;
        }
        scoreBoard();
    }

    function buildBoard(){
        //gameValues.cur
        domEle.letters.innerHTML = '';
        domEle.hiddenWord.innerHTML = '';
        gameValues.solution.forEach((lett)=>{
            let div = createElements('div',domEle.hiddenWord,'-');
            div.classList.add('boxE');
            div.letter = lett;
            if(lett == ' '){
                div.style.borderColor = 'white';
                div.textContent = ' ';
            }else{
                gameValues.total++;
            }
        })

        for(let i=0;i<26;i++){
            let temp = String.fromCharCode(65 + i);
            let div = createElements('div',domEle.letters,temp);
            div.style.cursor = 'grab';
            div.classList.add('box');
            let checker = function(e){
                checkLetters(temp);
                div.style.backgroundColor = '#ddd';
                div.style.cursor = 'default';
                div.classList.remove('box');
                div.classList.add('boxD');
                div.removeEventListener('click',checker);
            }
            div.addEventListener('click',checker);
        }
    }
    function createElements(val,parentEle,output){
        let temp =  document.createElement(val);
        parentEle.append(temp);
        temp.textContent = output;
        return temp;
    }
    return {
        init:init
    }
}();