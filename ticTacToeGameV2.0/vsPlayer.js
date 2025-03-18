window.addEventListener('load', function() {
//Variables localStorage
let playerOneSelection = localStorage.getItem('playerOneSelection') === 'true'; //If true P1 is X, if False P1 is O
let xTotalWins = parseInt(localStorage.getItem('xWins')) || 0;
let oTotalWins = parseInt(localStorage.getItem('oWins')) || 0;
let tiesTotal = parseInt(localStorage.getItem('tiesTotal')) || 0;

//Variables Globales
let currentPlayer = 'O';
let turnNumber = 0;
let clickPerSquare = {};

//Variables para encontrar ganador
let wayToWin = {};
const winningCombinations = [
    ["one", "two", "three"], 
    ["four", "five", "six"], 
    ["seven", "eight", "nine"], 
    ["one", "four", "seven"], 
    ["two", "five", "eight"], 
    ["three", "six", "nine"], 
    ["one", "five", "nine"], 
    ["three", "five", "seven"] 
];
let winnerFound = false;
let winner = null;

//Variables para actualizar puntuaciones
let xScoreGlobal = xTotalWins || 0;
let oScoreGlobal = oTotalWins || 0;
let tiesScoreGlobal = tiesTotal || 0;

//Funcion para manejar Scores
function handleScoreBoards() {
    const xScore = document.getElementById('xScore');
    const oScore = document.getElementById('oScore');

    if (playerOneSelection === true) {
        xScore.textContent  = '(P1)';
        oScore.textContent  = '(P2)';
    }else if (playerOneSelection === false) {
        xScore.textContent = '(P2)';
        oScore.textContent  = '(P1)';
    }
}
handleScoreBoards();

//Funcion para ScoreBoards Points
function scoreBoardsPoints() {
    let xScoreResult = document.getElementById('xScoreResult');
    let oScoreResult = document.getElementById('oScoreResult');
    let tiedScoreResult = document.getElementById('tiesResult');

    let xTotalWins = parseInt(localStorage.getItem('xWins')) || 0;
    let oTotalWins = parseInt(localStorage.getItem('oWins')) || 0;
    let tiesTotal = parseInt(localStorage.getItem('tiesTotal')) || 0;

    xScoreGlobal = xTotalWins;
    oScoreGlobal = oTotalWins;
    tiesScoreGlobal = tiesTotal;

    xScoreResult.textContent = xScoreGlobal;
    oScoreResult.textContent = oScoreGlobal;
    tiedScoreResult.textContent = tiesScoreGlobal;
}
scoreBoardsPoints();

//Funcion para manejar turnos
function handlerTurns() {
    if (turnNumber % 2 !== 0) {
        currentPlayer = 'X'
    }else {
        currentPlayer = 'O'
    }
}

//Funcion para mostrar Overlay en Screens
function showOverlay() {
    const overlay  = document.getElementById('overlay');
    overlay.style.display = 'block';
}

//Funcion para mostrar pantalla de Ganador y manejar mensaje de ganador
function showWinnerScreen() {
    const whoWon = document.getElementById('winnerOrLooser');
    const winnerScreen = document.querySelector('.winnerScreenContainer');
    const takesTheRound = document.querySelector('.takesTheRound');
    const oWinImg = document.getElementById('winnerImgO');
    const xWinImg = document.getElementById('winnerImgX');

    if (playerOneSelection === true && winner === 'X' || playerOneSelection === false && winner === 'O') {
        whoWon.textContent = 'Player 1 Wins!'
    } else if (playerOneSelection === false && winner === 'X' || playerOneSelection === true && winner === 'O') {
        whoWon.textContent = 'Player 2 Wins'
    }

    if (winner === 'X') {
        takesTheRound.style.color = '#31c3bd'
        oWinImg.style.display = 'none';
        xWinImg.style.display = 'block';
    } else if (winner === 'O') {
        takesTheRound.style.color = '#f2b137'
        oWinImg.style.display = 'block';
        xWinImg.style.display = 'none';
    }
    winnerScreen.style.display = 'flex';
    showOverlay();
}

//Funcion para obtener Square a partir de Board
function getSquares() {
    const board = document.querySelectorAll('.cuadranteContainer');
    const squares = [];

    board.forEach(function(square) {
        const id = square.id;
        squares.push({square, id})
    });
    return squares
}

//Funcion para mostrar pantalla de empate
function showTiedScreen() {
    const tiedScreen = document.querySelector('.tiedScreenContainer');
    tiedScreen.style.display = 'flex';
    showOverlay();
}

//Funcion para mostrar pantalla de Reset
function showResetScreen() {
    const resetScreen = document.getElementById('restartScreenContainer');
    resetScreen.style.display = 'flex';
    showOverlay();
}

//Funcion para Hide Elements Needed
function hideElements() {

}

//Funcion para esconder todo despues de reset o comenzar de nuevo
function restartBoardGame() {
    const showTurnO = document.getElementById('turnO');
    const showTurnX = document.getElementById('turnX');
    const winnerScreen = document.querySelector('.winnerScreenContainer');
    const restartScreen = document.getElementById('restartScreenContainer');
    const tiedScreen = document.querySelector('.tiedScreenContainer');
    const overlay = document.getElementById('overlay');
    const squares = getSquares();

    squares.forEach(function({square, id}) {
        const imageO = square.querySelector('.cuadranteO');
        const imageX = square.querySelector('.cuadranteX');

        imageO.style.display = 'none';
        imageX.style.display = 'none';
        square.style.backgroundColor = '#1F3641';
    });

    showTurnO.style.display = 'block';
    showTurnX.style.display = 'none';
    winnerScreen.style.display = 'none';
    restartScreen.style.display = 'none';
    tiedScreen.style.display = 'none';
    overlay.style.display = 'none';
    currentPlayer = 'O';
    turnNumber = 0;
    clickPerSquare = {};
    wayToWin = {};
    tiedFound = false;
    winnerFound = false;
    winner = null;
}

//Funcion para detectar ganador
function checkForWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations [i];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        if (wayToWin[a] && wayToWin[a] === wayToWin[b] && wayToWin[a] === wayToWin[c]) {
            winner = currentPlayer; 
            winnerFound = true;
            showWinnerScreen();
            console.log('Ganador es:', winner);

            combo.forEach(function(id) { //Cambiar color de fondo en Square ganadores
                let square = document.getElementById(id);
                square.style.backgroundColor = 'yellow';
                return;
            });
        }
        if (Object.keys(wayToWin).length === 9 && winnerFound === false) {
            let tiesTotal = parseInt(localStorage.getItem('tiesTotal')) || 0;
            let tiedScreen = document.querySelector('.tiedScreenContainer');
            
            tiedScreen.style.display = 'flex';
            tiedFound = true;
            showTiedScreen();
            tiesTotal++;
            localStorage.setItem('tiesTotal', tiesTotal);
            console.log('Empate!');
        }
    }
}

//Funcion para Reset Button
function buttonReset() {
    const resetButton = document.querySelector('.restartButton');
    resetButton.addEventListener('click', function() {
        showResetScreen();
    });
}
buttonReset();

//Funcion para botones Quit en Screens
function buttonScreenQuit() {
    let quitButtons = document.querySelectorAll('.quitButton');

    quitButtons.forEach(function(quitButton) {
        quitButton.addEventListener('click', function() {

            window.location.href = 'index.html';
            winnerFound = false;
            winner = null;
            currentPlayer = 'O';
            turnNumber = 0;
            clickPerSquare = {};
            localStorage.setItem('tiesTotal', '0');
            localStorage.setItem('xWins', '0');
            localStorage.setItem('oWins', '0');
        });
    })
}
buttonScreenQuit();

//Funcion para boton No de Reset
function buttonNoReset() {
    const noButton = document.getElementById('noButton');
    const overlay = document.getElementById('overlay');
    const restartScreen = document.getElementById('restartScreenContainer');
    noButton.addEventListener('click', function() {
        restartScreen.style.display = 'none';
        overlay.style.display = 'none';
    })
}
buttonNoReset();

//Funcion para boton Yes, Reset
function buttonYesReset() {
    const yesButton = document.getElementById('yesButton');
    const overlay = document.getElementById('overlay');
    const restartScreen = document.getElementById('restartScreenContainer');
    const showTurnO = document.getElementById('turnO');
    const showTurnX = document.getElementById('turnX');
    const winnerScreen = document.querySelector('.winnerScreenContainer');
    const tiedScreen = document.querySelector('.tiedScreenContainer');
    
    yesButton.addEventListener('click', function() {

        restartScreen.style.display = 'none';
        overlay.style.display = 'none';
        showTurnO.style.display = 'block';
        showTurnX.style.display = 'none';
        currentPlayer = 'O';
        turnNumber = 0;
        clickPerSquare = {};
        wayToWin = {};
        tiedFound = false;
        winnerFound = false;
        winner = null;
        localStorage.setItem('tiesTotal', '0');
        localStorage.setItem('xWins', '0');
        localStorage.setItem('oWins', '0');
    });
}
buttonYesReset();

//Funcion para Next Round Buttons en Screens
function buttonScreenNextRound() {
    const nextRoundButtons = document.querySelectorAll('.nextRoundButton');

    nextRoundButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let xWins = parseInt(localStorage.getItem('xWins')) || 0;
            let oWins = parseInt(localStorage.getItem('oWins')) || 0;

            if (winner === 'X') {
                xWins++;
                localStorage.setItem('xWins', xWins);
            } else if (winner === 'O') {
                oWins++;
                localStorage.setItem('oWins', oWins);
            }
            restartBoardGame();

            console.log('Winner:', winner);
            console.log('Winner Found?:', winnerFound);
            console.log('Clicks per Square:', clickPerSquare);
        });
    });
}
buttonScreenNextRound();

//Funcion para cambiar Mark y Show Turn dinamicamente, manejar 1 click maximo por Square y cambios de turno
function handlerClicksAndTurns() {
    let board = document.querySelectorAll('.cuadranteContainer');
    const squares = getSquares();
    
    board.forEach(function(square) {
        const id = square.id;
        let imageO = square.querySelector('.cuadranteO');
        let imageX = square.querySelector('.cuadranteX');
        let showTurnO = document.getElementById('turnO');
        let showTurnX = document.getElementById('turnX');

        square.addEventListener('click', function() {

            //2 clicks maximo por Square
            if (!clickPerSquare[id]) {
                clickPerSquare[id] = 0;
            }
            if (clickPerSquare[id] >= 1) {
                console.log(`Can't Click anymore on ${id}`);
                return;
            }
            clickPerSquare[id]++;
            handlerTurns();
            wayToWin[id] = currentPlayer; //INVESTIGAR

            if (currentPlayer === 'X') {
                imageX.style.display = 'block'
                showTurnX.style.display = 'none';//repite
                showTurnO.style.display = 'block'; //repite
            }else {
                imageO.style.display = 'block'
                showTurnX.style.display = 'block';
                showTurnO.style.display = 'none';
            }
            turnNumber++;
            let result = checkForWinner();
            if (result) {
                console.log('Ganador Encontrado!');
            }
        })
    })
}
handlerClicksAndTurns();
});