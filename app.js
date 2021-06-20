const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
}

const resetButton = document.querySelector('#reset');
let maxScoreSelector = document.querySelector('#playto');
let maxScore = 3;


let isGameOver = false;

function setColor (score1, score2) {
    if (score1 > score2) {
        p1.display.classList.add('has-text-success');
        p2.display.classList.add('has-text-danger');
    } else if (score1 < score2) {
        p1.display.classList.add('has-text-danger');
        p2.display.classList.add('has-text-success');
    }
}

function setGameOver(){
    switchGameOver();
    setColor(p1.score, p2.score);
    disableButtons();
}

function resetGame () {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}

function switchGameOver () {
    if(isGameOver){
        isGameOver = false;
    } else {
        isGameOver = true;
    }
}

function updateDisplay (element, score) {
    return element.textContent = score;
}

function disableButtons () {
    p1.button.disabled = true;
    p2.button.disabled = true;
}

function updateScore(player, opponent) {
    if(!isGameOver) {
        player.score++;
        if(player.score === maxScore) {
            setGameOver()
        }
        updateDisplay(player.display, player.score);
        updateDisplay(opponent.display, opponent.score);
    } 
}

maxScoreSelector.addEventListener('change', function () {
    resetGame();
    maxScore = parseInt(this.value);
});

p1.button.addEventListener('click', () => {
    updateScore(p1, p2)
});

p2.button.addEventListener('click', () => {
    updateScore(p2, p1)
});

resetButton.addEventListener('click', () => {
    resetGame();  
});


