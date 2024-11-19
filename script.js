const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button'); // Hämta knappen
let currentPlayer = 'X';
const board = Array(9).fill(null);

// Funktion för att kontrollera vinnare
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'Draw';
}

// Funktion för att hantera klick på en cell
function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        alert(winner === 'Draw' ? 'Det blev oavgjort!' : `${winner} vinner!`);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Funktion för att återställa spelet
function resetGame() {
    board.fill(null); // Töm spelbrädet
    cells.forEach(cell => (cell.textContent = '')); // Rensa rutorna
    currentPlayer = 'X'; // Starta om med spelare "X"
}

// Lägg till event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame); // Koppla "Spela igen"-knappen
