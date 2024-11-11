const gameboard = document.querySelector('.gameboard');
const boxes = document.querySelectorAll('.box');

let gameState = ['','','','','','','','',''];
let currentPlayer = 'X';

function checkWinner(){
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a]; 
        }
    }

    if (!gameState.includes('')) return 'draw';
    return null; 
}

function handlePlayerMove(index) {
    if (gameState[index] === '' && currentPlayer === 'X') {
        gameState[index] = 'X';
        boxes[index].classList.add('x');
        boxes[index].textContent = 'X';
        currentPlayer = 'O';
        checkGameState();
        if (currentPlayer === 'O') computerMove();
    }
}

function computerMove() {
    let emptyCells = gameState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    gameState[randomMove] = 'O';
    boxes[randomMove].classList.add('o');
    boxes[randomMove].textContent = 'O';
    currentPlayer = 'X';
    checkGameState();
}

function checkGameState() {
    let winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            alert("It's a draw!");
        } else {
            alert(`${winner} wins!`);
        }
        resetGame();
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    boxes.forEach(box => {
        box.classList.remove('x', 'o');
        box.textContent = '';
    });
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handlePlayerMove(index));
}); 