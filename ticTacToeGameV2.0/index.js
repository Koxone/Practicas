//Variables Globales
let playerOneSelection = undefined; //True means X, False means O

//Funcion para seleccion de Jugador 1
function selectPlayer() {
    const xUnselected = document.getElementById('xUnselected');
    const oUnselected = document.getElementById('oUnselected');
    const toggleShape = document.getElementById('toggleShape');

    xUnselected.addEventListener('click', function() {
        const shapeValue = getComputedStyle(toggleShape);
        const xSelected = document.getElementById('xSelected');
        const oSelected = document.getElementById('oSelected');

        if (shapeValue.right === '11.1562px') {
            console.log('Shape estaba en O');
            toggleShape.classList.add('active');
            xUnselected.style.display = 'none';
            xSelected.style.display = 'block';
            xSelected.style.zIndex = '2';
            oUnselected.style.display = 'block';
            oSelected.style.display = 'none';
            playerOneSelection = true;
        }
    });

    oUnselected.addEventListener('click', function() {
        const shapeValue = getComputedStyle(toggleShape);
        const xSelected = document.getElementById('xSelected');
        const oSelected = document.getElementById('oSelected');

        if (shapeValue.right === '133.906px') {
            console.log('Shape estaba en X');
            toggleShape.classList.remove('active');
            xUnselected.style.display = 'block';
            xSelected.style.display = 'none';
            xSelected.style.zIndex = '2';
            oUnselected.style.display = 'none';
            oSelected.style.display = 'block';
            playerOneSelection = false;
        }
    });
}
selectPlayer();

document.addEventListener('click', function() {
    let prueba = localStorage.getItem('playerOneSelection');
    console.log(playerOneSelection);
});

//Funcion para iniciar el juego en vsPlayer
function vsPlayer() {
    const vsPlayerButton = document.getElementById('newGameCPUButton');

    vsPlayerButton.addEventListener('click', function() {
        localStorage.setItem('playerOneSelection', playerOneSelection);
        window.location.href = 'boardGame.html';
    });
}
vsPlayer();