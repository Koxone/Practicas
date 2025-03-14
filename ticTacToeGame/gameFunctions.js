// Recuperar datos de localStorage al cargar la página
window.addEventListener('load', function () {
    let clickCount = 0;
    let clicksPorCuadrante = {};
    let turnNumber = 1;
    let currentPlayer = null;
    let currentMarkPermitted = 'O';
    let permittedO = null;
    let permittedX = null;

    let wayToWin = {};
    const winningCombinations = [
        ["one", "two", "three"], // Fila superior
        ["four", "five", "six"], // Fila del medio
        ["seven", "eight", "nine"], // Fila inferior
        ["one", "four", "seven"], // Columna izquierda
        ["two", "five", "eight"], // Columna central
        ["three", "six", "nine"], // Columna derecha
        ["one", "five", "nine"], // Diagonal principal
        ["three", "five", "seven"] // Diagonal secundaria
    ];
    let winnerFound = false;
    let winner = null;
    
    const playerOneSelection = localStorage.getItem('playerOneSelection') === 'true'; // Convertir a booleano
    let xTotalWins = localStorage.getItem('X Wins');
    let oTotalWins = localStorage.getItem('O Wins');
    let tiesTotal = localStorage.getItem('Ties');

//Funcion para designar Current Player
function designateCurrentPlayer() {

    if (playerOneSelection === false && clickCount <= 1 && turnNumber <= 1) { //Primer Turno, Si al iniciar P1 eligio O
        currentPlayer = 1;
        permittedO = true;
        permittedX = false;
    } else if (playerOneSelection === true && clickCount <= 1 && turnNumber <= 1) { //Primer Turno, Si al iniciar el P1 eligio X
        currentPlayer = 2
        permittedO = false;
        permittedX = true;
    }

    if (permittedO === true && permittedX === false && turnNumber <= 1) { //Jugador 1 eligio O
        currentMarkPermitted = 'O';
    } else if (permittedO === false && permittedX === true && turnNumber <= 1) {
        currentMarkPermitted = 'O'
    } else if (permittedO === false && permittedX === true && turnNumber >= 2) {
        currentMarkPermitted = 'X'
    }
}
designateCurrentPlayer();

//Funcion para manejar Current Player
function handleCurrentPlayer() {

    if (turnNumber % 2 !== 0) {
        currentPlayer = 'X';
    } else if (turnNumber % 2 === 0) {
        currentPlayer = '0';
    }
}

//Funcion para manejar Scores Counters
function handleScoresCounter() {
    const xScoreCounter = document.getElementById('xScoreResult');
    const oScoreCounter = document.getElementById('oScoreResult');
    const tiesScoreCounter = document.getElementById('tiesResult');

        xScoreCounter.textContent = xTotalWins;
        oScoreCounter.textContent = oTotalWins;
        tiesScoreCounter.textContent = tiesTotal;

        console.log('X Total Wins:', xTotalWins);
        console.log('O Total Wins:', oTotalWins);
        console.log('Ties Total:', tiesTotal);
}

//Funcion para mostrar simbolos en cada cuadrante
function handleClicksAndTurns() {

    let cuadrantes = document.querySelectorAll('.cuadranteContainer');

    cuadrantes.forEach(function(cuadrante) {
        const id = cuadrante.id;
        let imageO = cuadrante.querySelector('.cuadranteO');
        let imageX = cuadrante.querySelector('.cuadranteX');
        let showTurnO = document.getElementById('turnO');
        let showTurnX = document.getElementById('turnX');

        cuadrante.addEventListener('click', function() {

            handleCurrentPlayer();

            if (winnerFound === true) {
                console.log('Game already finished, please start a new game or a new round');
                return;
            }
            if (!clicksPorCuadrante[id]) {
                clicksPorCuadrante[id] = 0;
            }
            clicksPorCuadrante[id]++;

            if (clicksPorCuadrante[id] >= 2) {
                return;
            }
            clickCount++;
            turnNumber ++;

            if (currentMarkPermitted === 'O') {
                imageO.style.display = 'block';
                currentMarkPermitted = 'X';
                showTurnO.style.display = 'none';
                showTurnX.style.display = 'block';
            } else if (currentMarkPermitted === 'X') {
                imageX.style.display = 'block'
                currentMarkPermitted = 'O';
                currentPlayer = 1;
                showTurnO.style.display = 'block';
                showTurnX.style.display = 'none';
            }
            
            wayToWin[id] = currentMarkPermitted;
            let result = checkForWinner();
            if (result) {
                console.log('Se encontro Ganador, Juego Terminado');
            }
        })
    })
}
handleClicksAndTurns();

//Funcion para pantalla de Empate
function showTiedScreen() {
    let quitButton = document.getElementById('tiedQuitButton');
    let nextRoundButton = document.getElementById('tiedNextRoundButton');
    let tiedScreen = document.querySelector('.tiedScreenContainer');
    let overlay = document.getElementById('overlay');
    let imagenesO = document.querySelectorAll('.cuadranteO');
    let imagenesX = document.querySelectorAll('.cuadranteX');
    let showTurnO = document.getElementById('turnO');
    let showTurnX = document.getElementById('turnX');


    overlay.style.display = 'flex';

    quitButton.addEventListener('click', function() {

        imagenesO.forEach(function(imageO) {
            imageO.style.display = 'none';
        });

        imagenesX.forEach(function(imageX) {
            imageX.style.display = 'none';
        })
        overlay.style.display = 'none';
        window.location.href = 'index.html';
    });

    nextRoundButton.addEventListener('click', function() {
        handleScoresCounter();
        let tiesLocal = parseInt(localStorage.getItem('Ties')) || 0;
        tiesLocal++;
        localStorage.setItem('Ties', tiesLocal);

        imagenesO.forEach(function(imageO) {
            imageO.style.display = 'none';
        });

        imagenesX.forEach(function(imageX) {
            imageX.style.display = 'none';
        })
        overlay.style.display = 'none';
        tiedScreen.style.display = 'none';
        showTurnO.style.display = 'block';
        showTurnX.style.display = 'none';
        clickCount = 0;
        clicksPorCuadrante = {};
        wayToWin = {};
        winnerFound = false;
        turnNumber = 1;
        currentMarkPermitted = 'O';
        permittedO = null;
        permittedX = null;
        localStorage.setItem('X Wins', 0);
        localStorage.setItem('O Wins', 0);
    })
}

//Funcion para pantalla de ganador
function showWinnerScreen() {
    let winnerScreen = document.querySelector('.winnerScreenContainer');
    let nextRoundButton = document.getElementById('nextRoundButton');
    let quitButton = document.getElementById('quitButton');
    let overlay = document.getElementById('overlay');
    let imagenesO = document.querySelectorAll('.cuadranteO');
    let imagenesX = document.querySelectorAll('.cuadranteX');
    let showTurnO = document.getElementById('turnO');
    let showTurnX = document.getElementById('turnX');
    let cuadrantes = document.querySelectorAll('.cuadranteContainer');

    let winnerName = document.getElementById('winnerOrLooser');
    let takesTheRound = document.getElementById('takesTheRound');
    let winnerO = document.getElementById('winnerImgO');
    let winnerX = document.getElementById('winnerImgX');


    //Funcion animacion de confetti
    function lanzarConfeti() {
        confetti({
            particleCount: 200, // Cantidad de partículas
            spread: 90, // Angulo de dispersión
            origin: { y: 0.6 }, // Desde dónde sale el confeti
            scalar: 1.2 // Tamaño del confeti
        });
    }

    winnerScreen.style.display = 'flex';
    overlay.style.display = 'block';
    lanzarConfeti();

    if (winner === 'X') {
        winnerName.textContent = 'Winner!';
        takesTheRound.style.color = '#31C3BD'
        winnerO.style.display = 'none';
        winnerX.style.display = 'block';
        xTotalWins++;
        localStorage.setItem('X Wins', xTotalWins);
    } else if (winner === 'O') {
        winnerName.textContent = 'Winner!';
        takesTheRound.style.color = '#F2B137'
        winnerO.style.display = 'block';
        winnerX.style.display = 'none';
        oTotalWins++;
        localStorage.setItem('O Wins', oTotalWins);
    }

    nextRoundButton.addEventListener('click', function() { //Next Round Button
        handleScoresCounter();
        imagenesO.forEach(function(imageO) {
            imageO.style.display = 'none';
        });

        imagenesX.forEach(function(imageX) {
            imageX.style.display = 'none';
        })
        cuadrantes.forEach(function(cuadrante) {
            cuadrante.style.backgroundColor = '#1F3641';
        })
        overlay.style.display = 'none';
        winnerScreen.style.display = 'none';
        showTurnO.style.display = 'block';
        showTurnX.style.display = 'none';
        clickCount = 0;
        clicksPorCuadrante = {};
        wayToWin = {};
        winnerFound = false;
        turnNumber = 1;
        currentMarkPermitted = 'O';
        permittedO = null;
        permittedX = null;
    })

    quitButton.addEventListener('click', function() { //Next Round Button
        imagenesO.forEach(function(imageO) {
            imageO.style.display = 'none';
        });
        imagenesX.forEach(function(imageX) {
            imageX.style.display = 'none';
        })
        overlay.style.display = 'none';
        winnerScreen.style.display = 'none;'
        window.location.href = 'index.html';
        localStorage.setItem('X Wins', 0);
        localStorage.setItem('O Wins', 0);
        localStorage.setItem('', 0);
    });
}

//Funcion para detectar Ganador
function checkForWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations[i];
        let a = combo[0];
        let b = combo[1];
        let c = combo[2];

        if (wayToWin[a] && wayToWin[a] === wayToWin[b] && wayToWin[a] === wayToWin[c]) {
                winnerFound = true;
                identifyWinner();
                showWinnerScreen();

                console.log('Ganador es:', winner);
                console.log('Se encontro Ganador!');

                combo.forEach(function(id) {
                    let cuadrante = document.getElementById(id);
                    cuadrante.style.backgroundColor = '#FFD700';
                });
                return;
            }
    }
    if (Object.keys(wayToWin).length === 9 && winnerFound === false) {
        let tiedScreen = document.querySelector('.tiedScreenContainer');
        tiedScreen.style.display = 'flex';
        console.log("¡Empate! No hay más movimientos disponibles.");
        showTiedScreen();
    }
}

//Funcion para identificar winner
function identifyWinner() {
    let xWins = parseInt(localStorage.getItem('X Wins')) || 0;  
    let oWins = parseInt(localStorage.getItem('O Wins')) || 0;  

    if (turnNumber % 2 !== 0) {  
        winner = 'X';
        xWins++;  
        localStorage.setItem('X Wins', xWins);  
    } else {  
        winner = 'O';
        oWins++;  
        localStorage.setItem('O Wins', oWins);   
    }
}
    
//Funcion para cambios dinamicos segun seleccion de player 1
function playerDinamics() {
    let xScore = document.getElementById('xScore');
    let oScore = document.getElementById('oScore');
    let xResult = document.getElementById('xScoreResult');
    let oResult = document.getElementById('oScoreResult');

    if (playerOneSelection === true) {
        xScore.textContent = '(P1)'
        oScore.textContent = '(P2)'
    } else if (playerOneSelection === false) {
        xScore.textContent = '(P2)'
        oScore.textContent = '(P1)'
    }
}
playerDinamics();

//Funcion para resetButton
function resetButton() {
    let restartButton = document.querySelector('.restartButton');
    let restartScreen = document.querySelector('.restartScreenContainer');
    let overlay = document.getElementById('overlay');
    let yesButton = document.getElementById('yesButton');
    let noButton = document.getElementById('noButton');

    restartButton.addEventListener('click', function() {
        restartScreen.style.display = 'flex';
        overlay.style.display = 'block';

        noButton.addEventListener('click', function() {
            restartScreen.style.display = 'none';
            overlay.style.display = 'none';
        });

        yesButton.addEventListener('click', function() {
            let imagenesO = document.querySelectorAll('.cuadranteO');
            let imagenesX = document.querySelectorAll('.cuadranteX');
            let showTurnO = document.getElementById('turnO');
            let showTurnX = document.getElementById('turnX');

            imagenesO.forEach(function(imageO) {
                imageO.style.display = 'none';
            });

            imagenesX.forEach(function(imageX) {
                imageX.style.display = 'none';
            })
            restartScreen.style.display = 'none';
            overlay.style.display = 'none';
            localStorage.setItem('X Wins', 0);
            localStorage.setItem('O Wins', 0);
            localStorage.setItem('Ties', 0);
            xTotalWins = 0;
            oTotalWins = 0;
            tiesTotal = 0;
            handleScoresCounter();
            window.location.href = 'index.html';
        })
    })
}
resetButton();

  //Función para forzar un empate al hacer clic en el logo
  function forceTieForTesting() {
    const headerLogo = document.querySelector(".headerLogoContainerMain")

    if (headerLogo) {
      headerLogo.addEventListener("click", () => {
        console.log("Forzando empate para pruebas")

        // Llenar wayToWin con valores que no forman una combinación ganadora
        // pero que ocupan todos los cuadrantes
        wayToWin = {
          one: "X",
          two: "O",
          three: "X",
          four: "X",
          five: "O",
          six: "O",
          seven: "O",
          eight: "X",
          nine: "X",
        }

        // Mostrar todas las imágenes en los cuadrantes
        document.querySelectorAll(".cuadranteContainer").forEach((cuadrante) => {
          const id = cuadrante.id
          const imageO = cuadrante.querySelector(".cuadranteO")
          const imageX = cuadrante.querySelector(".cuadranteX")

          if (wayToWin[id] === "O") {
            imageO.style.display = "block"
            imageX.style.display = "none"
          } else {
            imageO.style.display = "none"
            imageX.style.display = "block"
          }

          // Marcar como ya clickeado
          if (!clicksPorCuadrante[id]) {
            clicksPorCuadrante[id] = 0
          }
          clicksPorCuadrante[id] = 1
        })

        // Forzar la verificación de empate
        winnerFound = false
        clickCount = 9

        // Llamar a la función que verifica el ganador, que detectará el empate
        checkForWinner()
      })
    } else {
      console.error("No se encontró el elemento .headerLogoContainerMain")
    }
  }
  forceTieForTesting()

  //Función para forzar una victoria al hacer clic en oScoreDinamic
  function forceWinForTesting() {
    const oScoreDinamic = document.getElementById("oScoreDinamic")

    if (oScoreDinamic) {
      oScoreDinamic.addEventListener("click", () => {
        console.log("Forzando victoria para O para pruebas")

        // Llenar wayToWin con valores que forman una combinación ganadora para O
        // Usamos la primera combinación ganadora: ["one", "two", "three"]
        wayToWin = {
          one: "O",
          two: "O",
          three: "O",
        }

        // Mostrar las imágenes O en los cuadrantes de la combinación ganadora
        ;["one", "two", "three"].forEach((id) => {
          const cuadrante = document.getElementById(id)
          if (cuadrante) {
            const imageO = cuadrante.querySelector(".cuadranteO")
            if (imageO) {
              imageO.style.display = "block"
            }

            // Marcar como ya clickeado
            if (!clicksPorCuadrante[id]) {
              clicksPorCuadrante[id] = 0
            }
            clicksPorCuadrante[id] = 1
          }
        })

        // Forzar la verificación de ganador
        winnerFound = false

        // Llamar a la función que verifica el ganador
        checkForWinner()
      })
    } else {
      console.error("No se encontró el elemento con ID oScoreDinamic")
    }
  }
  forceWinForTesting()

});





