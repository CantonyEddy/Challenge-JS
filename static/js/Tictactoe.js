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
  };