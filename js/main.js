function clearTable() {
    initialize(getTableSize());
}

function initialize(size) {
    createTable(size);
    setState("not solved");
}

function setState(state) {
    let bState = document.getElementById("board-state");
    if(state == "not solved")
        bState.innerHTML = '<h2>Board <span style="color:orange">Not Solved</span></h2>';
    else if(state == "solved")
        bState.innerHTML = '<h2>Board <span style="color:green">Solved</span></h2>';
    else
        bState.innerHTML = '<h2>Board <span style="color:red">Unsolvable</span></h2>';
}

function solve() {
    var board = Array(getTableSize());
    for(let i = 0; i < getTableSize(); i++){
        board[i] = Array(getTableSize());
        for(let j = 0; j < getTableSize(); j++)
            board[i][j] = document.getElementById(i + " " + j).value;
    }
    let solved = getSolution(board);

    if(solved) {
        setState('solved');
        for(let i = 0; i < getTableSize(); i++) {
            for(let j = 0; j < getTableSize(); j++){
                let cell = document.getElementById(i + " " + j);
                cell.value = board[i][j];
                cell.className = "";
            }
        }
    }
    else {
        setState('unsolvable');
        setWrong(document.getElementsByTagName('input'));
    }
}

function fillSudoku() {
    board = getSudoku();
    initialize(getTableSize());
    for(let i = 0; i < getTableSize(); i++) {
        for(let j = 0; j < getTableSize(); j++){
            let willAdd = Math.random();
            if(willAdd < 0.2) {
                let cell = document.getElementById(i + " " + j);
                cell.value = board[i][j];
                cell.className = "";
            }
        }
    }
}