function emptyCells( board) {
  var empty = [];
  for (var i = 0; i < getTableSize(); i++) {
      for (var j = 0; j < getTableSize(); j++) {
          if (board[i][j] === "") {
              var boxRow = 3* Math.floor( i/3);
              var boxCol = 3* Math.floor( j/3);
              empty.push([i,j, boxRow, boxCol]);
          }
      }
  }
  return empty;
}

function isUnique( board, empty, value) {
  var row, col;

  // test row
  row = board[empty[0]];
  for( col = 0; col < getTableSize(); ++ col) {
      if( value == row[col]) {
          return false;
      }
  }
  // test col
  col = empty[1];
  for( var row = 0; row < getTableSize(); ++row) {
      if( value == board[ row][col]){
          return false;
      }	
  }
  // test box
  var boxRow = empty[2];
  var boxCol = empty[3];
  for( var i = 3; i--;) {
      row = board[ boxRow++];
      for( var j = 3; j--;) {
          if( row[boxCol + j] == value) {
              return false;
          }
      }
  }
  return true;
}

function solveSudoku(board) {
  var empty = emptyCells( board);

  nextEmpty:
  for (var i = 0; i < empty.length;) { // We check every possible value for all empty 1x1 squares.
      var row = empty[i][0]; // Used for row and 3x3 square checks
      var column = empty[i][1]; // Used for column and 3x3 square checks
      var value = board[row][column] + 1; // We start at 1, because obviously 0 is not a Sudoku value.   
      var cell = empty[i];

      while (value <= 9) { // test values up to 9.
          if( isUnique( board, cell, value)) {
              board[row][column] = value; // We assign said value to the corresponding board 1x1 square, for now.
              i++; // Move on to the check next empty cell.
              continue nextEmpty;
          }
          value++; // If the value is invalid, we simply try the next possible value.    
      }

      board[row][column] = 0;
      if( i == 0) {  // board is not solvable
          return null;
      }
      i--; // We go back to the previous 1x1 square to try a different value.
  }
  return true;
};

function validBoard(arraySolution) {
  for (var y = 0; y < getTableSize(); ++y) {
      for (var x = 0; x < getTableSize(); ++x) {
          var value = arraySolution[y][x];
          if (value != "") {
              // Check the line
              for (var x2 = 0; x2 < getTableSize(); ++x2) {
                  if (x2 != x && arraySolution[y][x2] == value) {
                      return false;
                  } 
              }

              // Check the column
              for (var y2 = 0; y2 < getTableSize(); ++y2) {
                  if (y2 != y && arraySolution[y2][x] == value) {
                      return false;
                  } 
              }

              // Check the square
              var startY = Math.floor(y/3)*3;
              for (var y2 = startY; y2 < startY + 3; ++y2) {
                  var startX = Math.floor(x/3)*3;
                  for (x2 = startX; x2 < startX + 3; ++x2) {
                      if ((x2 != x || y2 != y) && arraySolution[y2][x2] == value) {
                          return false;
                      }
                  }
              }
          }
      }
  }

  return true;
}

function getSolution(board) {
  if(validBoard(board)){
    solveSudoku(board);
    if(validBoard(board))
      return true;
  }
  return false;
}

function markRow(board) {
  let wrong = false;
  for(let row = 0; row < getTableSize(); row++)
  for(let i = 0; i < getTableSize(); i++) {
    for(let j = i + 1; j < getTableSize(); j++) {
      if(board[row + " " + i].value == board[row + " " + j].value && board[row + " " + i].value != ""){
        board[row + " " + i].className = "bg-danger";
        board[row + " " + j].className = "bg-danger";
      }
    }
  }
  return wrong;
}

function markColumn(board) {
  let wrong = false;
  for(let column = 0; column < getTableSize(); column++)
  for(let i = 0; i < getTableSize(); i++) {
    for(let j = i + 1; j < getTableSize(); j++) {
      if(board[i + " " + column].value == board[j + " " + column].value && board[i + " " + column].value != ""){
        board[i + " " + column].className = "bg-danger";
        board[j + " " + column].className = "bg-danger";
      }
    }
  }
  return wrong;
}

function markSquare(board) {
  let wrong = false;
  for(let row = 0; row < getTableSize(); row++ ){
    for(let col = 0; col < getTableSize(); col++){
      for(let i1 = row - row % 3; i1 < row - row % 3 + 3; i1++){ 
        for(let j1 = col - col % 3; j1 < col - col % 3 + 3; j1++){
          for(let i2 = row - row % 3; i2 < row - row % 3 + 3; i2++) {
            for(let j2 = col - col % 3; j2 < col - col % 3 + 3; j2++) {
              if(board[i1 + " " + j1].value == board[i2 + " " + j2].value && (i1 != i2 || j1 != j2) && board[i1 + " " + j1].value != ""){
                board[i1 + " " + j1].className = "bg-danger";
                board[i2 + " " + j2].className = "bg-danger";
              }
            }
          }
        }
      }
    }
  }
  return wrong;
}

function setWrong(board) {
    markRow(board);
    markColumn(board);
    markSquare(board);
}