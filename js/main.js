/*----- constants -----*/
const playerLookup = {
    '1': 'X',
    '-1': 'O'
};
console.log(playerLookup[1]);
/*----- app's state (variables) -----*/
let board;
let turn;
let winner = false;

/*----- cached element references -----*/
//const squareEls = Array.from(document.querySelectorAll('#squares > div'));
const msgEl = document.getElementById('msg');
const sqEl = document.getElementById('c0r0');
const btnEl = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('squares').addEventListener('click', handleClick);
btnEl.addEventListener('click', handleCliick);



/*----- functions -----*/
init();

function init () {
    
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    turn = 1;
    msgEl.innerHTML = "It is " + playerLookup[turn] + "'s turn";
}

function render () {

}

function handleClick (evt) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (evt.target.id === `c${i}r${j}`) {
                if (evt.target.innerHTML === '') {
                    board[i][j] = turn;
                    evt.target.innerHTML = playerLookup[turn];
                    if (playerLookup[turn] === 'X') turn = -1;
                    else turn = '1';
                    console.log(board[i][j]);
                }
            }
        }
    }
    msgEl.innerHTML = "It is " + playerLookup[turn] + "'s turn";
    /////if(getWinner()) msgEl.innerHTML = "It is Joshua's turn";
}
function clearBoard(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            let ji = document.getElementById(`c${i}r${j}`);
            ji.innerHTML = '';
        }
    }
}

function handleCliick () {
    init();
    clearBoard();
    turn = 1;
    msgEl.innerHTML = "It is " + playerLookup[turn] + "'s turn";
}

function getWinner () {
    let topRow = 0, midRow = 0, botRow = 0;
    let rhtCol = 0, midCol = 0, lefCol = 0;
    let leftDiag = 0, rghtDiag = 0;
    for (let i = 0; i < 3; i++) {
        topRow += board[i][2];
        midRow += board[i][1];
        botRow += board[i][0];
        rhtCol += board[2][i];
        midCol += board[1][i];
        lefCol += board[0][i];
        console.log(topRow);
    }
    if (Math.abs(topRow) === 3 ||
        Math.abs(midRow) === 3 ||
        Math.abs(botRow) === 3 ||
        Math.abs(rhtCol) === 3 ||
        Math.abs(midCol) === 3 ||
        Math.abs(lefCol) === 3) winner = true;
    return winner;
}