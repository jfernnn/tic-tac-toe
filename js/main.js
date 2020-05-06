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
const btnEl = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('squares').addEventListener('click', handleClick);
btnEl.addEventListener('click', handleButtonClick);



/*----- functions -----*/
init();

function init () {
    
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    clearBoard();
    turn = 1;
    winner = false;
    msgEl.innerHTML = "It is " + playerLookup[turn] + "'s turn";
}

function render (evt) {
    if(!winner){
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (evt.target.id === `c${i}r${j}`) {
                    if (evt.target.innerHTML === '') {
                        board[i][j] = turn;
                        evt.target.innerHTML = playerLookup[turn];
                        if (playerLookup[turn] === 'X') turn = -1;
                        else turn = '1';
                    }
                }
            }
        }
        msgEl.innerHTML = "It is " + playerLookup[turn] + "'s turn";
    }
    if(getWinner()) msgEl.innerHTML = playerLookup[-(turn)] + ' won!!';
}

function handleClick (evt) {
    render(evt);
}

function clearBoard(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            let ji = document.getElementById(`c${i}r${j}`);
            ji.innerHTML = '';
        }
    }
}

function handleButtonClick () {
    init();
}

function getWinner () {
    let topRow = 0, midRow = 0, botRow = 0;
    let rhtCol = 0, midCol = 0, lefCol = 0;
    let leftDiag = 0, rghtDiag = 0;
    for (let i = 0; i < 3; i++) {
        topRow += parseInt(board[i][2]);
        midRow += parseInt(board[i][1]);
        botRow += parseInt(board[i][0]);
        rhtCol += parseInt(board[2][i]);
        midCol += parseInt(board[1][i]);
        lefCol += parseInt(board[0][i]);
        leftDiag += parseInt(board[i][i]);
        rghtDiag += parseInt(board[i][2-i]);
    }
     
    if (Math.abs(topRow) === 3 ||
        Math.abs(midRow) === 3 ||
        Math.abs(botRow) === 3 ||
        Math.abs(rhtCol) === 3 ||
        Math.abs(midCol) === 3 ||
        Math.abs(lefCol) === 3 ||
        Math.abs(leftDiag) === 3 ||
        Math.abs(rghtDiag) === 3) winner = true;
    return winner;
}