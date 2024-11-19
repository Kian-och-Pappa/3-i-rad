const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const playerSection = document.getElementById('player-section');
const currentPlayerText = document.getElementById('current-player');
const playerSymbolInput = document.getElementById('player-symbol');
const submitSymbolButton = document.getElementById('submit-symbol');

let player1Symbol = 'X';
let player2Symbol = 'O';
let currentPlayer = 'Player 1'; // Börjar med Player 1
let board = Array(9).fill(null);

// Funktion för att hantera symbolval
function setPlayerSymbol() {
    const symbol = playerSymbolInput.value.trim();
    if (symbol === '' || ['å', 'ä', 'ö'].includes(symbol.toLowerCase())) {
        alert('Vänligen välj en bokstav (inte å, ä, ö).');
        return;
    }

    if (currentPlayer === 'Player 1') {
        player1Symbol = symbol; // Sätt Player 1:s symbol
        currentPlayer = 'Player 2'; // Växla till Player 2
        currentPlayerText.textContent = 'Player 2, välj din symbol:'; // Uppdatera texten
        document.body.style.backgroundColor = 'blue'; // Ändra bakgrundsfärg
    } else {
        player2Symbol = symbol; // Sätt Player 2:s symbol
        currentPlayer = 'Player 1'; // Återgå till Player 1 för att starta spelet
        currentPlayerText.textContent = 'Player 1, din tur!'; // Visar att Player 1 börjar
        document.body.style.backgroundColor = 'limegreen'; // Ändra tillbaka bakgrundsfärgen
        playerSection.style.display = 'none'; // Dölj inputsektionen
    }

    playerSymbolInput.value = ''; // Rensa inputfältet
}


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

    const symbol = currentPlayer === 'Player 1' ? player1Symbol : player2Symbol;
    board[index] = symbol;
    event.target.textContent = symbol;

    const winner = checkWinner();
    if (winner) {
        alert(winner === 'Draw' ? 'Det blev oavgjort!' : `${winner} vinner!`);
        return;
    }

    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
}

// Funktion för att återställa spelet
function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'Player 1';
    player1Symbol = 'X';
    player2Symbol = 'O';
    playerSection.style.display = 'block';
    currentPlayerText.textContent = 'Player 1, välj din symbol:';
    document.body.style.backgroundColor = 'limegreen';
}

// Lägg till event listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
submitSymbolButton.addEventListener('click', setPlayerSymbol);
