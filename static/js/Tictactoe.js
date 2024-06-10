//A chaque fois que le jeu se lance, recharger la page
//A chaque fois que le jeu est rechargé, remettre la page à zéro

// select elements
const boardCells = document.querySelectorAll('.board-cell');
const turn = document.querySelector('.turn');
const result = document.querySelector('.result');
const startButton = document.getElementById('startButton');
const gameModeSelect = document.getElementById('gameMode');

const playerOne = 'X';
const playerTwo = 'O';

var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var againstComputer = false;

function startGame() {
  boardCells.forEach((cell, index) => {
    cell.innerHTML = '';
    cell.addEventListener('click', handleClick.bind(null, cell, index));
  });
  turn.innerHTML = 'Player 1'; // Reset the turn display
  result.style.display = 'none'; // Hide the result display
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  againstComputer = gameModeSelect.value === 'playerVsComputer'; // Set the mode based on the selection
}

function handleClick(cell, index) {
  const cellValue = cell.innerHTML;
  if (cellValue === '') {
    if (turn.innerHTML === 'Player 1') {
      cell.innerHTML = playerOne;
      board[Math.floor(index / 3)][index % 3] = playerOne;
      if (checkWinner()) return;
      if (againstComputer) {
        computerMove();
        if (checkWinner()) return;
      } else {
        turn.innerHTML = 'Player 2';
      }
    } else {
      cell.innerHTML = playerTwo;
      board[Math.floor(index / 3)][index % 3] = playerTwo;
      if (checkWinner()) return;
      turn.innerHTML = 'Player 1';
    }
  }
  cell.removeEventListener('click', handleClick);
}

function computerMove() {
  let move = findBestMove();
  if (move === null) {
    move = getRandomMove();
  }
  const cell = boardCells[move];
  cell.innerHTML = playerTwo;
  board[Math.floor(move / 3)][move % 3] = playerTwo;
  cell.removeEventListener('click', handleClick);
}

function findBestMove() {
  // Check if computer can win
  let winMove = findWinningMove(playerTwo);
  if (winMove !== null) return winMove;

  // Check if player needs to be blocked
  let blockMove = findWinningMove(playerOne);
  if (blockMove !== null) return blockMove;

  return null;
}

function findWinningMove(player) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        board[i][j] = player;
        if (checkWinnerInternal(player)) {
          board[i][j] = '';
          return i * 3 + j;
        }
        board[i][j] = '';
      }
    }
  }
  return null;
}

function getRandomMove() {
  let emptyCells = [];
  boardCells.forEach((cell, index) => {
    if (cell.innerHTML === '') {
      emptyCells.push(index);
    }
  });
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function checkWinner() {
  if (checkWinnerInternal(playerOne)) {
    showResult(playerOne);
    return true;
  }
  if (checkWinnerInternal(playerTwo)) {
    showResult(playerTwo);
    return true;
  }
  // Check for a tie
  if (board.flat().every(cell => cell !== '')) {
    showResult('Egality');
    return true;
  }
  return false;
}

function checkWinnerInternal(player) {
  // Check for rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }
  // Check for columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
      return true;
    }
  }
  // Check for diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }
  return false;
}

function showResult(symbol) {
  if (symbol === playerOne) {
    result.innerHTML = 'Player 1 Win';
  } else if (symbol === playerTwo) {
    result.innerHTML = 'Player 2 Win';
  } else {
    result.innerHTML = 'Egalité';
  }
  result.style.display = 'flex';
  boardCells.forEach(cell => cell.removeEventListener('click', handleClick)); // Disable all clicks
}

startButton.addEventListener('click', function() {
  startGame();
});
