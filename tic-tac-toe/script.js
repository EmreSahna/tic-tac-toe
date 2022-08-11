const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let board = ['', '', '', '', '', '', '', '', ''];
var currentPlayer = 'X';
var items = Array.from(document.querySelectorAll('.game-board-item'));

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const updateBoard =  (index) => {
    board[index] = currentPlayer;
}

const addPoint = (team) => {
    var element = document.getElementById(team);
    var currentPoint = parseInt(element.innerHTML);
    element.innerHTML = ++currentPoint;
}

const boardReset = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    items.forEach(element => {
        element.innerHTML = '';
        element.classList.remove('xmark-2');
        element.classList.remove('circle-2');
    });
}

const handleLastWinner = (winner) => {
    var element = document.getElementsByClassName('last-winner')[0];
    if(winner == 'X'){
        element.innerHTML = 'X';
        element.classList.remove('circle-2');
        element.classList.add('xmark-2');
    }else if(winner == 'O'){
        element.innerHTML = 'O';
        element.classList.remove('xmark-2');
        element.classList.add('circle-2');
    }
}

const handleEndOfRound = () => {
    if(currentPlayer === 'X'){
        addPoint('xmark-team');
        handleLastWinner('X');

    }else if(currentPlayer === 'O'){
        addPoint('circle-team');
        handleLastWinner('O');
    }
    boardReset();
}

const checkWinner = () => {
    let roundEnd = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundEnd = true;
            break;
        }
    }
    if(roundEnd){
        handleEndOfRound();
    }
    if(!board.includes('')){
        boardReset();
    }
}

const userAction = (item, index) => {
    if(!(item.innerText === 'X' || item.innerText === 'O')){
        item.innerText = currentPlayer;
        if(currentPlayer == 'X'){
            item.classList.add('xmark-2');
        }else{
            item.classList.add('circle-2');
        }
        updateBoard(index);
        checkWinner();
        changePlayer();
    }
}

items.forEach( (item, index) => {
    item.addEventListener('click', () => userAction(item, index));
});