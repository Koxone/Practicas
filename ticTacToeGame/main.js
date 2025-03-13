//Variables Globales
let playerOneSelection = false;
let playerOneMark = '';
let playerTwoMark = '';
let currentPlayer = null;

let playerOneMarkCPU = '';
let cpuMark = '';

//Funcion para mover el boton de seleccion de Mark
function toggleButton() {
    let xShapeUnselected = document.getElementById('xUnselected');
    let xShapeSelected = document.getElementById('xSelected');
    let oShapeUnselected = document.getElementById('oUnselected');
    let oShapeSelected = document.getElementById('oSelected');
    let shape = document.getElementById('toggleShape');
    let shapeGlow = document.querySelector('.toggleShape');
    let shapeStyleValue = getComputedStyle(shape);
    let shapeRightNumberValue = parseFloat(shapeStyleValue.right);
    let rightCurrentValue = null;

    xShapeUnselected.addEventListener('click', function() {//2.78645px X 1%

        if (shapeRightNumberValue === 11.1458) {
            shapeGlow.classList.add('active');
            shape.style.right = '133.7496px'
            xShapeSelected.style.display = 'block';
            xShapeSelected.style.zIndex = '2';
            xShapeUnselected.style.display = 'none';
            oShapeSelected.style.display = 'none';
            oShapeUnselected.style.display = 'block';
            playerOneSelection = true;
            currentPlayer = 2;
            rightCurrentValue = '133.7496px';
            console.log('Shape Right Current Value:', rightCurrentValue)
        } 

    oShapeUnselected.addEventListener('click', function() {
        console.log('O Button Funciona');

        if (rightCurrentValue === '133.7496px') {
            shapeGlow.classList.remove('active');
            shape.style.right = '11.1458px'
            xShapeSelected.style.display = 'none';
            xShapeSelected.style.zIndex = '2';
            xShapeUnselected.style.display = 'block';
            oShapeSelected.style.display = 'block';
            oShapeUnselected.style.display = 'none';
            oShapeUnselected.style.zIndex = '2';
            playerOneSelection = false;
            currentPlayer = 1;
            rightCurrentValue = '11.1458px';
        }
    })
    })


}
toggleButton();

//Funcion para iniciar el Juego en VS PLAYER
function vsPlayer() {
    let newGameButton = document.getElementById('newGameCPUButton');
    
    newGameButton.addEventListener('click', function() {
        if (playerOneSelection === true) { //Si jugador 1 eligio X
            playerOneMark = 'X';
            playerTwoMark = 'O';
        }else {
            playerOneMark = 'O';
            playerTwoMark = 'X';
        }

        localStorage.setItem('playerOneSelection', playerOneSelection);
        localStorage.setItem('playerOneMark', playerOneMark);
        localStorage.setItem('playerTwoMark', playerTwoMark);
        window.location.href = 'gameScreen.html';
    })
}
vsPlayer();

//Funcion para iniciar Juego en VS CPU
function vsCPU() {
    let vsCpuButton = document.getElementById('newGamePlayerButton');

    vsCpuButton.addEventListener('click', function() {
        if (playerOneSelection === true) {
            playerOneMarkCPU = 'X'
            cpuMark = 'O'
        }else {
            playerOneMark = 'O'
            cpuMark = 'X'
        }

        localStorage.setItem('playerOneSelectionCPU', playerOneSelection);
        localStorage.setItem('playerOneMarkCPU', playerOneMarkCPU);
        localStorage.setItem('cpuMark', cpuMark);
        window.location.href = 'vsCPU.html';
    })
}
vsCPU();


