const gameBoard = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const messageBox = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');
    
    if (gameState[cellIndex] || checkWinner()) return;
    
    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    if (checkWinner()) {
        showMessage(`${currentPlayer} wins!`);
    } else if (gameState.every(cell => cell)) {
        showMessage('Draw!');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    messageBox.textContent = '';
}

function showMessage(message) {
    messageBox.textContent = message;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
