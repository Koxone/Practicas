window.addEventListener('load', function () {
//Variables Globales
let clickCount = 0; //Total de Clicks Globales
let clicksPorCuadrante = {}; //Total de Clicks por cada Square
let turnNumber = 0;
let playerOne = '';
let playerCPU = '';
let currentPlayer = '';
let permittedO = null;
let permittedX = null;

//Variables condicionales para Winner
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

//Get from LocalStorage
const playerOneSelectionCPU = localStorage.getItem('playerOneSelectionCPU') === 'true'; // Convertir a booleano

//Para la CPU
let cpuTimeoutId = null;

//Funcion para actualizar UI
function actualizarTurnoUI() {
    const showTurnO = document.getElementById('turnO');
    const showTurnX = document.getElementById('turnX');
    
    if (currentPlayer === 'O') {
        showTurnO.style.display = 'block';
        showTurnX.style.display = 'none';
    } else {
        showTurnO.style.display = 'none';
        showTurnX.style.display = 'block';
    }
}

//Funcion para QuitButton en pantallas
function quitButton() {
    let quitButton = document.querySelectorAll('#tiedQuitButton, #quitButton');
    let winnerScreen = document.querySelector('.winnerScreenContainer');
    let overlay = document.getElementById('overlay');
    let tiedScreen = document.querySelector('.tiedScreenContainer');

    quitButton.forEach(function(quit) {
        quit.addEventListener('click', function() {
            winnerScreen.style.display = 'none';
            tiedScreen.style.display = 'none';
            overlay.style.display = 'none';
            window.location.href = 'index.html'
        })
    })
}

//funcion para NextRoundButton en pantallas
function nextRoundButton() {
    let nextRoundButton = document.querySelectorAll('#nextRoundButton, #tiedNextRoundButton');
    let cuadrantes = document.querySelectorAll('.cuadranteContainer');
    let winnerScreen = document.querySelector('.winnerScreenContainer');
    let overlay = document.getElementById('overlay');
    let tiedScreen = document.querySelector('.tiedScreenContainer');
    let imagenesO = document.querySelectorAll('.cuadranteO');
    let imagenesX = document.querySelectorAll('.cuadranteX');
    let showTurnO = document.getElementById('turnO');
    let showTurnX = document.getElementById('turnX');

    nextRoundButton.forEach(function(next) {
        next.addEventListener('click', function() {
            if (cpuTimeoutId) {
                clearTimeout(cpuTimeoutId);
                cpuTimeoutId = null;
            }
            overlay.style.display = 'none';
            winnerScreen.style.display = 'none';
            tiedScreen.style.display = 'none';
            showTurnO.style.display = 'block';
            showTurnX.style.display = 'none';

            imagenesO.forEach(function(imageO) {
                imageO.style.display = 'none';
            });
        
            imagenesX.forEach(function(imageX) {
                imageX.style.display = 'none';
            });
            cuadrantes.forEach(function(cuadrante) {
                cuadrante.style.backgroundColor = '#1F3641';
            });
            winnerFound = false;
            winner = null;
            wayToWin = {};
            clickCount = 0; 
            clicksPorCuadrante = {}; 
            turnNumber = 0;
            playerOne = '';
            playerCPU = '';
            currentPlayer = '';
            permittedO = null;
            permittedX = null;
            handleCurrentPlayerAndTurns();
        })
    })
}

//Funcion para cambio automatico de Player
function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}

//Funcion para Manejar primer turno
function handleCurrentPlayerAndTurns() {
    if (cpuTimeoutId) {
        clearTimeout(cpuTimeoutId);
        cpuTimeoutId = null;
    }
    if (playerOneSelectionCPU) { 
        playerOne = 'X';
        playerCPU = 'O';
        currentPlayer = playerCPU; 
        if (!winnerFound) {
            cpuTimeoutId = setTimeout(() => cpuMove(), 1000); 
        }
    } else { 
        playerOne = 'O';
        playerCPU = 'X';
        currentPlayer = playerOne;
    }
}
handleCurrentPlayerAndTurns();

//Funcion para manejar clicks y cambio de turno
function clickAndTurnHandler() {
    document.querySelectorAll('.cuadranteContainer').forEach(square => {
        square.addEventListener('click', function() {
            if (currentPlayer !== playerOne || winnerFound) return;

            const id = square.id;
            if (clicksPorCuadrante[id] >= 1) return;

            // Registrar movimiento
            clicksPorCuadrante[id] = 1;
            wayToWin[id] = currentPlayer;
            
            // Mostrar imagen
            const symbol = currentPlayer === 'X' ? 'cuadranteX' : 'cuadranteO';
            square.querySelector(`.${symbol}`).style.display = 'block';

            // Verificar ganador
            const hayGanador = checkForWinner();
            
            // Cambiar turno solo si no hay ganador
            if (!hayGanador) {
                toggleCurrentPlayer();
                actualizarTurnoUI();
                if (currentPlayer === playerCPU) setTimeout(() => cpuMove(), 500);
            }
        });
    });
}

//Funcion para mostrar pantalla de ResetButton
function showResetScreen() {
    let resetScreen = document.getElementById('restartScreenContainer');
    let yesRestartButton = document.getElementById('yesButton');
    let noCancelButton = document.getElementById('noButton');
    let overlay = document.getElementById('overlay');

    resetScreen.style.display = 'block';
    overlay.style.display = 'block';

    noCancelButton.addEventListener('click', function() {
            resetScreen.style.display = 'none';
            overlay.style.display = 'none';
    });

    yesRestartButton.addEventListener('click', function() {
        resetScreen.style.display = 'none';
        overlay.style.display = 'none';
        window.location.href = 'index.html'
    });
}

//Funcion para botton de Reset
function resetButton() {
    let resetButton = document.querySelector('.restartButton');

    resetButton.addEventListener('click', function() {
        showResetScreen();
    });
}

//Funcion para mostrar pantalla de ganador
function showWinnerScreen() {
    let winnerScreen = document.querySelector('.winnerScreenContainer');
    let overlay = document.getElementById('overlay');

        //Funcion animacion de confetti
        function lanzarConfeti() {
            confetti({
                particleCount: 200, // Cantidad de partículas
                spread: 90, // Angulo de dispersión
                origin: { y: 0.6 }, // Desde dónde sale el confeti
                scalar: 1.2 // Tamaño del confeti
            });
        }

    overlay.style.display = 'block';
    winnerScreen.style.display = 'flex';
    lanzarConfeti();
    quitButton();
    nextRoundButton();
}

//Funcion para mostrar pantalla de empate
function showTiedScreen() {
    let tiedScreen = document.querySelector('.tiedScreenContainer');
    let overlay = document.getElementById('overlay');

    overlay.style.display = 'block';
    tiedScreen.style.display = 'flex';
    quitButton();
    nextRoundButton();
}

//Funcion para detectar ganador
function checkForWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if(wayToWin[a] && wayToWin[a] === wayToWin[b] && wayToWin[a] === wayToWin[c]) {
            winnerFound = true;
            combo.forEach(id => {
                document.getElementById(id).style.backgroundColor = '#FFD700';
            });
            showWinnerScreen();
            return true;
        }
    }
    if (Object.keys(wayToWin).length === 9 && !winnerFound) {
        showTiedScreen();
        return true;
    }
    return false;
}

//Funcion para verificar si hay casillas vacias
function getAvailableSquares() {
    let availableCells = [];

    document.querySelectorAll('.cuadranteContainer').forEach(function(square) {
        const id = square.id;

        if (!clicksPorCuadrante[id] || clicksPorCuadrante[id] < 1) {
            availableCells.push(id);
        }
    });
    return availableCells;
}

//Funcion para movimiento aleatorio de CPU
function cpuMove() {
    if (winnerFound) return; // Salir inmediatamente si hay ganador

    if (cpuTimeoutId) {
        clearTimeout(cpuTimeoutId);
        cpuTimeoutId = null;
    }
    
    const availableSquares = Array.from(document.querySelectorAll('.cuadranteContainer'))
        .filter(square => !clicksPorCuadrante[square.id] && !winnerFound);

    if (availableSquares.length === 0) {
        checkForWinner();
        return;
    }

    const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    const id = randomSquare.id;

    // Registrar movimiento
    clicksPorCuadrante[id] = 1;
    wayToWin[id] = playerCPU;
    
    // Actualizar UI
    const symbol = playerCPU === 'X' ? 'cuadranteX' : 'cuadranteO';
    randomSquare.querySelector(`.${symbol}`).style.display = 'block';

    // Verificar si el movimiento de la CPU genera un ganador
    const hayGanador = checkForWinner();
    
    // Cambiar turno solo si no hay ganador
    if (!hayGanador) {
        toggleCurrentPlayer();
        actualizarTurnoUI();
    }
}

//Funcion para ocultar pantallas
function hideScreens() {
    let tiedScreen = document.querySelector('.tiedScreenContainer');
    let winnerScreen = document.querySelector('.winnerScreenContainer');
    let letras = document.getElementById('winnerOrLooser');

    letras.addEventListener('click', function() {
        winnerScreen.style.display = 'none';
        tiedScreen.style.display = 'none';
    })
}
hideScreens();
clickAndTurnHandler();
resetButton();
});