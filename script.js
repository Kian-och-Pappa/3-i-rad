const cells = document.querySelectorAll('.cell'); // Hämtar alla celler
let currentPlayer = 'X'; // Startspelare
const board = Array(9).fill(null); // Skapar ett tomt bräde med 9 rutor

// Funktion för att kontrollera vinnare
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horisontella
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikala
        [0, 4, 8], [2, 4, 6],            // Diagonala
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Returnera vinnaren ('X' eller 'O')
        }
    }
    return board.includes(null) ? null : 'Draw'; // Om brädet är fullt, returnera "Draw"
}

// Funktion för att hantera klick på en cell
function handleClick(event) {
    const index = event.target.dataset.index; // Hämtar cellens index
    if (board[index] || checkWinner()) return; // Avsluta om cellen redan är fylld eller om det finns en vinnare

    board[index] = currentPlayer; // Uppdaterar brädet med nuvarande spelare
    event.target.textContent = currentPlayer; // Visar "X" eller "O" i rutan

    const winner = checkWinner(); // Kollar om någon har vunnit
    if (winner) {
        alert(winner === 'Draw' ? 'Det blev oavgjort!' : `${winner} vinner!`);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Växlar spelare
}

// Lägg till en klick-lyssnare på varje cell
cells.forEach(cell => cell.addEventListener('click', handleClick));
