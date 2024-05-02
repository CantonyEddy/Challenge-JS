//A chaque fois que le jeu se lance, recharger la page
//A chaque fois que le jeu est rechargé, remettre la page à zéro

// select all useful elements
const boardCells = document.querySelectorAll('.board-cell');
const turn = document.querySelector('.turn');
const result = document.querySelector('.result');

const playerOne = 'X';
const playerTwo = 'O';

var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function startGame() {
  boardCells.forEach((cell, index) => {
    cell.innerHTML = '';
    cell.addEventListener('click', handleClick.bind(null, cell, index));
  });
  //console.log('text');
};

//mettre a jour l'écran/le composant

function handleClick(cell, index) {
  const cellValue = cell.innerHTML;
  if (cellValue === '') {
    if (turn.innerHTML === 'Player 1') {
      cell.innerHTML = playerOne;
      turn.innerHTML = 'Player 2';
      board[Math.floor(index / 3)][index % 3] = playerOne;
    } else {
      cell.innerHTML = playerTwo;
      turn.innerHTML = 'Player 1';
      board[Math.floor(index / 3)][index % 3] = playerTwo;
    }
  }
  cell.removeEventListener('click', handleClick);
  checkWinner();
}


// check if player won
function checkWinner() {
  // check for rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
      showResult(board[i][0]);
      return;
    }
  }
  // check for columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
      showResult(board[0][i]);
      return;
    }
  }
  // check for diagonals
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
    showResult(board[0][0]);
    return;
  }
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
    showResult(board[0][2]);
    return;
  }
  // check for a tie
  // if all cells are filled and no winner
  var count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] != '') {
        count++;
      }
    }
  }
  if (count == 9) {
    showResult('Egality');
    return;
  }
}

// show result
function showResult(symbol) {
  if (symbol === playerOne) {
    result.innerHTML = 'Player 1 Win';
  } else if (symbol === playerTwo) {
    result.innerHTML = 'Player 2 Win';
  } else {
    result.innerHTML = 'Egalité';
  }
  result.style.display = 'flex';
}


document.getElementById('startButton').addEventListener('click', function() {
  //console.log('text');
  startGame();
})