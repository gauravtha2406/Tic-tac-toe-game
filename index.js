const start = 0;
const end = 1;
const playerturn = document.getElementById('playerTurn');
const game = document.getElementById('game');


const games = {
   state:start,
  turn: 'X',
  move: 0


}


//for ending the game
function endGame(winner){
if(winner){
  alert(`GAME OVER| Winner =${winner}`)
}
else{
  alert(`Game over|Match Draw`)
}
  games.state=end;
  
}

//for restating the game
function restartGame() {
  if (Math.random() > 0.5) games.turn = 'O'
  else games.turn = 'X'

  games.state = start;
  games.move = 0;

  Array.from(document.getElementsByTagName('td')).forEach(cell => {
      cell.textContent = ''
  })
}

//for game over
function nextTurn() {
  games.move++;
  if (games.turn == 'X') games.turn = 'O'
  else {
    games.turn = 'X';
  }
  if (games.move == 9) {
    // alert("GAME OVER");
    endGame();
  }
  playerturn.textContent = games.turn;
}



//for sequence checking 
function isSeqCaptured(arrayof3Cells){
  let winningcombo = games.turn + games.turn + games.turn;
  if (arrayof3Cells.map(item => item.textContent).join("") == winningcombo) {
    // alert(`GAME OVER||WINNER IS ${games.turn}`)
    endGame(games.turn);
  }
}


//for ROW CHECKING
function isRowCaptured(row) {
  let tablerow = Array.from(game.children[0].children[row].children);
  // let winningcombo = games.turn + games.turn + games.turn;
  // if (tablerow.map(item => item.textContent).join("") == winningcombo) {
  //   alert(`GAME OVER||WINNER IS ${games.turn}`)
  // }
  isSeqCaptured(tablerow);

}


// for column checking
function isColCaptured(col) {
  let tablecol = [game.children[0].children[0].children[col - 1],
      game.children[0].children[1].children[col - 1],
      game.children[0].children[2].children[col - 1]]
  // let winningcombo = games.turn + games.turn + games.turn;
  // if (tablecol.map(item => item.textContent).join("") == winningcombo) {
  //   alert(`GAME OVER||WINNER IS ${games.turn}`)
  // }
  isSeqCaptured(tablecol);
}


//for Diagnol Checking
function isDiagCaptured(row,col){

  let tableDiag1=[game.children[0].children[0].children[0],
  game.children[0].children[1].children[1],
  game.children[0].children[2].children[2]]

  let tableDiag2=[game.children[0].children[0].children[2],
  game.children[0].children[1].children[1],
  game.children[0].children[2].children[0]]

  isSeqCaptured(tableDiag1);
  isSeqCaptured(tableDiag2);
}


//for getting the selected row and column
function gamebox(row, col) {
  console.log("clicked", row, col);
  let clickedbox = game.children[0].children[row].children[col - 1]
  clickedbox.textContent = games.turn;
  isRowCaptured(row);
  isColCaptured(col);
  isDiagCaptured(row,col);
  nextTurn();
}
