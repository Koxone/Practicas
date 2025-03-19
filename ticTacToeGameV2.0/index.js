//Variables Globales
let playerOneSelection = undefined; 
let playerCPUSelection = true;

//Funcion para seleccion de Jugador 1
function selectPlayer() {
  const xUnselected = document.getElementById('xUnselected')
  const oUnselected = document.getElementById('oUnselected')
  const toggleShape = document.getElementById('toggleShape')

  xUnselected.addEventListener('click', function () {
    const shapeValue = getComputedStyle(toggleShape)
    const xSelected = document.getElementById('xSelected')
    const oSelected = document.getElementById('oSelected')

    if (shapeValue.right === '11.1562px') {
      console.log('Shape estaba en O')
      toggleShape.classList.add('active')
      xUnselected.style.display = 'none'
      xSelected.style.display = 'block'
      xSelected.style.zIndex = '2'
      oUnselected.style.display = 'block'
      oSelected.style.display = 'none'
      playerOneSelection = true
      playerCPUSelection = false
    }
  })

  oUnselected.addEventListener('click', function () {
    const shapeValue = getComputedStyle(toggleShape)
    const xSelected = document.getElementById('xSelected')
    const oSelected = document.getElementById('oSelected')

    if (shapeValue.right === '133.906px') {
      console.log('Shape estaba en X')
      toggleShape.classList.remove('active')
      xUnselected.style.display = 'block'
      xSelected.style.display = 'none'
      xSelected.style.zIndex = '2'
      oUnselected.style.display = 'none'
      oSelected.style.display = 'block'
      playerOneSelection = false
      playerCPUSelection = true
    }
  })
}
selectPlayer()

//Funcion para iniciar el juego en vsPlayer
const vsPlayer = () => {
    const vsPlayerButton = document.getElementById('newGameCPUButton')
    vsPlayerButton.addEventListener('click', () => {
        localStorage.setItem('playerOneSelection', playerOneSelection)
        localStorage.setItem('gameMode', 'player')
        window.location.href = 'boardGame.html'
    })
}
vsPlayer()

//Funcion para iniciar el juego en vsCPU
const vsCPU = () => {
    const vsCpuButton = document.getElementById('newGamePlayerButton')
    vsCpuButton.addEventListener('click', () => {
        localStorage.setItem('playerOneSelection', playerOneSelection)
        localStorage.setItem('playerCPUSelection', playerCPUSelection)
        localStorage.setItem('gameMode', 'cpu')
        window.location.href = 'boardGame.html'
    })
}
vsCPU()