let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleMove(index) {
    if (gameBoard[index] === '' && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        document.getElementById('game-board').children[index].innerText = currentPlayer;
        if (isGameOver()) {
            if (isWin()) {
                const pattern = isWin();
                const [a, b, c] = pattern;
                const cells = document.querySelectorAll('.cell');
                const positions = [a, b, c].map(i => cells[i].getBoundingClientRect());
                const line = document.createElement('div');
                line.classList.add('win-line');
                if (a % 3 === b % 3 && a % 3 === c % 3) { // vertical line
                    line.classList.add('vertical-line');
                    line.style.left = `${positions[0].left + 50}px`;
                    line.style.top = `${positions[0].top}px`;
                    line.style.height = `${positions[2].bottom - positions[0].top}px`;
                } else if (Math.floor(a / 3) === Math.floor(b / 3) && Math.floor(a / 3) === Math.floor(c / 3)) { // horizontal line
                    line.classList.add('horizontal-line');
                    line.style.left = `${positions[0].left}px`;
                    line.style.top = `${positions[0].top + 50}px`;
                    line.style.width = `${positions[2].right - positions[0].left}px`;
                } else { // diagonal line
                    line.classList.add('horizontal-line');
                    line.style.transform = 'rotate(45deg)';
                    line.style.width = `${Math.sqrt(Math.pow(positions[2].right - positions[0].left, 2) + Math.pow(positions[2].bottom - positions[0].top, 2))}px`;
                    line.style.left = `${positions[0].left}px`;
                    line.style.top = `${positions[0].top}px`;
                }
                document.body.appendChild(line);
                setTimeout(() => {
                    alert(`Player ${currentPlayer} wins!`);
                    resetBoard();
                    line.remove();
                }, 500);
            } else {
                setTimeout(() => {
                    alert('It\'s a draw!');
                    resetBoard();
                }, 500);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}


function isWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return pattern;
        }
    }

    return null;
}


function isGameOver() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return !gameBoard.includes('');
}


function resetBoard() {
    document.getElementById('game-board').classList.remove('win-animation');
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function resetGame() {
    resetBoard();
}
