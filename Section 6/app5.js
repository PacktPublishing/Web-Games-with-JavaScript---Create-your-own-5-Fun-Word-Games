const gameArea = document.querySelector('.gameArea');
const btn = document.createElement('button');
const message = document.createElement('div');
const question = document.createElement('div');
message.textContent = 'click the button to start the game';
message.classList.add('message');
question.classList.add('question');
const btnNext = document.createElement('button');
const game = {data:{},cur:''};
const player = {questions:0,correct:0,incorrect:0,total:0};
btn.textContent = "Start Game";
btnNext.textContent = "Next Question";
btnNext.style.display = 'none';
gameArea.append(message);
gameArea.append(question);
gameArea.append(btn);
gameArea.append(btnNext);

btn.addEventListener('click',startGame);
btnNext.addEventListener('click',nextQuestion);

function startGame(){
    btn.style.display = 'none';
    message.textContent = '';
    player.questions = 0;
    player.total = 0;
    player.correct = 0;
    player.incorrect = 0;
    loadQuizData('quiz.json');
    scoreBoard();
}

function scoreBoard(){
    message.innerHTML = `QUESTIONS ${player.questions} out of ${player.total} 
    <br>Correct (${player.correct}) Wrong (${player.incorrect})`;
}

function loadQuizData(url){
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(json =>{
        game.data = json.data;
        player.total = game.data.length;
        nextQuestion();
    })
}

function nextQuestion(){
    if(game.data.length != 0 ){
        player.questions++;
        game.cur = game.data.shift();
        createGame(game.cur);
    }else{
        question.innerHTML = 'Game over no more questions';
        btnNext.style.display = 'none';
    }
    scoreBoard();
}

function createGame(val){
    btnNext.style.display = 'none';
    question.innerHTML = '';
    const div = document.createElement('div');
    div.textContent = val.question;
    div.classList.add('que');
    question.append(div);
    const divHolder = document.createElement('div');
    divHolder.classList.add('ans');
    question.append(divHolder);
    const answers = val.opt;
    answers.push(val.answer);
    answers.sort(()=>{
        return 0.5 - Math.random();
    })
    answers.forEach(element => {
        const span = document.createElement('span');
        span.textContent =  element;
        span.classList.add('box');
        span.classList.add('boxA');
        divHolder.append(span);
        span.addEventListener('click',(e)=>{
            const eleBox = document.querySelectorAll('.box');
            eleBox.forEach((boxEl)=>{
                boxEl.classList.remove('boxA');
                boxEl.style.backgroundColor = '#ddd';
                boxEl.style.color = 'white';
            })
            if(element == val.answer){
                console.log('correct');
                player.correct++;
                span.style.backgroundColor = 'green';
            }else{
                console.log('INcorrect');
                player.incorrect++;
                span.style.backgroundColor = 'red';
            }
            scoreBoard();
            btnNext.style.display = 'block';
            divHolder.addEventListener('click',(e)=>{
                e.stopPropagation();
            },true);
        })
    });
    //console.log(answers);
}

