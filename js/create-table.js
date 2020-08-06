function getTableSize() {
    return document.getElementById("sudoku").getElementsByTagName("tbody")[0].children.length;
}

function createTable(nrRows) {
    let sizes = {3:"17%", 6:"36%", 9:"50%"};
    let nrColumns = nrRows;
    let board = document.getElementById("sudoku-board");
    board.style["width"] = sizes[nrRows];
    let table = document.getElementById("sudoku").getElementsByTagName("tbody")[0];
    $("#sudoku tr").remove();
    for(let i = 0; i < nrRows; i++) {
        let newRow = table.insertRow();
        for(let j = 0; j < nrColumns; j++) {
            let newCell = newRow.insertCell(j);
            newCell.innerHTML = '<input id="' + i + " " + j + '"type="number" min="1" max="9"/>';
        }
    }
}

Array.prototype.shuffle = function () {
    var arr = this.valueOf();
    var ret = [];
    while (ret.length < arr.length) {
       var x = arr[Math.floor(Number(Math.random() * arr.length))];
       if (!(ret.indexOf(x) >= 0)) ret.push(x);
    }
    return ret;
}

function getSudoku() {
   var sudoku = [];
   var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   sudoku.push(arr);
   for (var i = 1; i < getTableSize(); i++) {

      while (sudoku.length <= i) {
        var newarr = arr.shuffle();
        var b = false;
        for (var j = 0; j < arr.length; j++) {
            for (var k = 0; k < i; k++) {
                if (sudoku[k].indexOf(newarr[j]) == j) b = true;
            }

        }
        if (!b) {
            sudoku.push(newarr);
        }
     }
  }
  return sudoku;
}