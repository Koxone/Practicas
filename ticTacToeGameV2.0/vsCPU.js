window.addEventListener('load', function () {
//Variables localStorage
let playerOneSelection = localStorage.getItem('playerOneSelection') === 'true'

//Variables Globales
let currentPlayer = 'O' // O siempre va primero en el juego
let turnNumber = 0
let clickPerSquare = {}
let gameActive = true

//Variables para encontrar ganador
let wayToWin = {}
const winningCombinations = [
['one', 'two', 'three'],
['four', 'five', 'six'],
['seven', 'eight', 'nine'],
['one', 'four', 'seven'],
['two', 'five', 'eight'],
['three', 'six', 'nine'],
['one', 'five', 'nine'],
['three', 'five', 'seven'],
]
let winnerFound = false
let tiedFound = false
let winner = null

// Variable para controlar el timeout de la CPU
let cpuTimeoutId = null

// Determinar qué marca usa el jugador y la CPU
const playerMark = playerOneSelection ? 'X' : 'O'
const cpuMark = playerOneSelection ? 'O' : 'X'

//Funcion para manejar Scores
function handleScoreBoards() {
const xScore = document.getElementById('xScore')
const oScore = document.getElementById('oScore')

if (playerOneSelection === true) {
    xScore.textContent = '(P1)'
    oScore.textContent = '(CPU)'
} else if (playerOneSelection === false) {
    xScore.textContent = '(CPU)'
    oScore.textContent = '(P1)'
}
}
handleScoreBoards()

//Funcion para ScoreBoards Points
function scoreBoardsPoints() {
let xScoreResult = document.getElementById('xScoreResult')
let oScoreResult = document.getElementById('oScoreResult')
let tiedScoreResult = document.getElementById('tiesResult')

let xTotalWins = parseInt(localStorage.getItem('xWins')) || 0
let oTotalWins = parseInt(localStorage.getItem('oWins')) || 0
let tiesTotal = parseInt(localStorage.getItem('tiesTotal')) || 0

xScoreResult.textContent = xTotalWins
oScoreResult.textContent = oTotalWins
tiedScoreResult.textContent = tiesTotal
}
scoreBoardsPoints()

//Funcion para manejar turnos
function handlerTurns() {
if (turnNumber % 2 !== 0) {
    currentPlayer = 'X'
} else {
    currentPlayer = 'O'
}
}

//Funcion para mostrar Overlay en Screens
function showOverlay() {
const overlay = document.getElementById('overlay')
overlay.style.display = 'block'
}

//Funcion para mostrar pantalla de Ganador y manejar mensaje de ganador
function showWinnerScreen() {
const whoWon = document.getElementById('winnerOrLooser')
const winnerScreen = document.querySelector('.winnerScreenContainer')
const takesTheRound = document.querySelector('.takesTheRound')
const oWinImg = document.getElementById('winnerImgO')
const xWinImg = document.getElementById('winnerImgX')
if (winner === playerMark) {
    whoWon.textContent = 'YOU WON!'
} else {
    whoWon.textContent = 'OH NO, YOU LOST...'
}

if (winner === 'X') {
    takesTheRound.style.color = '#31c3bd'
    oWinImg.style.display = 'none'
    xWinImg.style.display = 'block'
} else if (winner === 'O') {
    takesTheRound.style.color = '#f2b137'
    oWinImg.style.display = 'block'
    xWinImg.style.display = 'none'
}
winnerScreen.style.display = 'flex'
showOverlay()
scoreBoardsPoints()
}

//Funcion para obtener Square a partir de Board
function getSquares() {
const board = document.querySelectorAll('.cuadranteContainer')
const squares = []

board.forEach(function (square) {
    const id = square.id
    squares.push({ square, id })
})
return squares
}

//Funcion para limpiar completamente el tablero
function clearBoard() {
const squares = getSquares()

squares.forEach(function ({ square, id }) {
    const imageO = square.querySelector('.cuadranteO')
    const imageX = square.querySelector('.cuadranteX')

    if (imageO) imageO.style.display = 'none'
    if (imageX) imageX.style.display = 'none'
    square.style.backgroundColor = '#1F3641'
})

// Restablecer variables de juego
currentPlayer = 'O'
turnNumber = 0
clickPerSquare = {}
wayToWin = {}
tiedFound = false
winnerFound = false
winner = null
gameActive = true

// Actualizar indicadores de turno
const showTurnO = document.getElementById('turnO')
const showTurnX = document.getElementById('turnX')
showTurnO.style.display = 'block'
showTurnX.style.display = 'none'
}

//Funcion para mostrar pantalla de empate
function showTiedScreen() {
const tiedScreen = document.querySelector('.tiedScreenContainer')
tiedScreen.style.display = 'flex'
showOverlay()
scoreBoardsPoints()
}

//Funcion para mostrar pantalla de Reset
function showResetScreen() {
const resetScreen = document.getElementById('restartScreenContainer')
resetScreen.style.display = 'flex'
showOverlay()
}

//Funcion para esconder todo despues de reset o comenzar de nuevo
function restartBoardGame() {
const winnerScreen = document.querySelector('.winnerScreenContainer')
const restartScreen = document.getElementById('restartScreenContainer')
const tiedScreen = document.querySelector('.tiedScreenContainer')
const overlay = document.getElementById('overlay')
if (cpuTimeoutId) {
    clearTimeout(cpuTimeoutId)
    cpuTimeoutId = null
}
clearBoard()
winnerScreen.style.display = 'none'
restartScreen.style.display = 'none'
tiedScreen.style.display = 'none'
overlay.style.display = 'none'
if (currentPlayer === cpuMark) {
    cpuTimeoutId = setTimeout(cpuMove, 1000)
}

scoreBoardsPoints()
}

//Funcion animacion de confetti
function lanzarConfeti() {
confetti({
    particleCount: 200, 
    spread: 90, 
    origin: { y: 0.6 }, 
    scalar: 1.2, 
})
}

//Funcion para detectar ganador
function checkForWinner() {
for (let i = 0; i < winningCombinations.length; i++) {
    let combo = winningCombinations[i]
    let a = combo[0]
    let b = combo[1]
    let c = combo[2]

    if (
    wayToWin[a] &&
    wayToWin[a] === wayToWin[b] &&
    wayToWin[a] === wayToWin[c]
    ) {
    winner = currentPlayer
    winnerFound = true
    gameActive = false
    lanzarConfeti()
    showWinnerScreen()
    console.log('Ganador es:', winner)

    combo.forEach(function (id) {
        let square = document.getElementById(id)
        square.style.backgroundColor = 'yellow'
    })

    return true
    }
}
return false
}

//Funcion para detectar empate
function checkForTie() {
if (Object.keys(wayToWin).length === 9 && !winnerFound) {
    let tiesTotal = parseInt(localStorage.getItem('tiesTotal')) || 0
    tiesTotal++
    localStorage.setItem('tiesTotal', tiesTotal)
    tiedFound = true
    gameActive = false
    showTiedScreen()
    console.log('Empate!')
    return true
}
return false
}

//Funcion para Reset Button
function buttonReset() {
const resetButton = document.querySelector('.restartButton')
resetButton.addEventListener('click', function () {
    showResetScreen()
})
}
buttonReset()

//Funcion para botones Quit en Screens
function buttonScreenQuit() {
let quitButtons = document.querySelectorAll('.quitButton')

quitButtons.forEach(function (quitButton) {
    quitButton.addEventListener('click', function () {
    if (cpuTimeoutId) {
        clearTimeout(cpuTimeoutId)
        cpuTimeoutId = null
    }

    window.location.href = 'index.html'
    winnerFound = false
    winner = null
    currentPlayer = 'O'
    turnNumber = 0
    clickPerSquare = {}
    localStorage.setItem('tiesTotal', '0')
    localStorage.setItem('xWins', '0')
    localStorage.setItem('oWins', '0')
    })
})
}
buttonScreenQuit()

//Funcion para boton No de Reset
function buttonNoReset() {
const noButton = document.getElementById('noButton')
const overlay = document.getElementById('overlay')
const restartScreen = document.getElementById('restartScreenContainer')
noButton.addEventListener('click', function () {
    restartScreen.style.display = 'none'
    overlay.style.display = 'none'
})
}
buttonNoReset()

//Funcion para boton Yes, Reset
function buttonYesReset() {
const yesButton = document.getElementById('yesButton')
const overlay = document.getElementById('overlay')
const restartScreen = document.getElementById('restartScreenContainer')

yesButton.addEventListener('click', function () {
    if (cpuTimeoutId) {
    clearTimeout(cpuTimeoutId)
    cpuTimeoutId = null
    }
    clearBoard()
    restartScreen.style.display = 'none'
    overlay.style.display = 'none'
    localStorage.setItem('tiesTotal', '0')
    localStorage.setItem('xWins', '0')
    localStorage.setItem('oWins', '0')
    scoreBoardsPoints()
    if (currentPlayer === cpuMark) {
    cpuTimeoutId = setTimeout(cpuMove, 1000)
    }
})
}
buttonYesReset()

//Funcion para Next Round Buttons en Screens
function buttonScreenNextRound() {
const nextRoundButtons = document.querySelectorAll('.nextRoundButton')

nextRoundButtons.forEach(function (button) {
    button.addEventListener('click', function () {
    let xWins = parseInt(localStorage.getItem('xWins')) || 0
    let oWins = parseInt(localStorage.getItem('oWins')) || 0

    if (winner === 'X') {
        xWins++
        localStorage.setItem('xWins', xWins)
    } else if (winner === 'O') {
        oWins++
        localStorage.setItem('oWins', oWins)
    }
    restartBoardGame()
    scoreBoardsPoints()
    })
})
}
buttonScreenNextRound()

// Función para el movimiento de la CPU
function cpuMove() {
if (!gameActive) return
if (currentPlayer !== cpuMark) return
const availableSquares = getSquares().filter(
    ({ id }) => !clickPerSquare[id] || clickPerSquare[id] < 1
)
if (availableSquares.length === 0) return
const randomIndex = Math.floor(Math.random() * availableSquares.length)
const { square, id } = availableSquares[randomIndex]
if (!clickPerSquare[id]) {
    clickPerSquare[id] = 0
}
clickPerSquare[id]++
wayToWin[id] = cpuMark
const imageO = square.querySelector('.cuadranteO')
const imageX = square.querySelector('.cuadranteX')
const showTurnO = document.getElementById('turnO')
const showTurnX = document.getElementById('turnX')

if (cpuMark === 'X') {
    imageX.style.display = 'block'
    showTurnX.style.display = 'none'
    showTurnO.style.display = 'block'
} else {
    imageO.style.display = 'block'
    showTurnX.style.display = 'block'
    showTurnO.style.display = 'none'
}

turnNumber++

// Verificar si hay un ganador o empate
const hasWinner = checkForWinner()
if (!hasWinner) {
    checkForTie()
}

// Cambiar al turno del jugador
handlerTurns()
}

//Funcion para cambiar Mark y Show Turn dinamicamente, manejar 1 click maximo por Square y cambios de turno
function handlerClicksAndTurns() {
const squares = getSquares()

squares.forEach(function ({ square, id }) {
    let imageO = square.querySelector('.cuadranteO')
    let imageX = square.querySelector('.cuadranteX')
    let showTurnO = document.getElementById('turnO')
    let showTurnX = document.getElementById('turnX')

    square.addEventListener('click', function () {
    if (!gameActive) return
    if (currentPlayer !== playerMark) return
    if (!clickPerSquare[id]) {
        clickPerSquare[id] = 0
    }
    if (clickPerSquare[id] >= 1) {
        console.log(`Can't Click anymore on ${id}`)
        return
    }

    clickPerSquare[id]++
    wayToWin[id] = currentPlayer

    if (currentPlayer === 'X') {
        imageX.style.display = 'block'
        showTurnX.style.display = 'none'
        showTurnO.style.display = 'block'
    } else {
        imageO.style.display = 'block'
        showTurnX.style.display = 'block'
        showTurnO.style.display = 'none'
    }
    const hasWinner = checkForWinner()
    if (!hasWinner) {
        const hasTie = checkForTie()
        if (!hasTie) {
        handlerTurns()
        cpuTimeoutId = setTimeout(cpuMove, 1000)
        }
    }
    })
})
}
handlerClicksAndTurns()

if (currentPlayer === cpuMark) {
cpuTimeoutId = setTimeout(cpuMove, 1000)
}
})
