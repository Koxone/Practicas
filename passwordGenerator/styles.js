let sliderCurrentValue = ''
let checkBoxState = {}

// Función para mover slider y cambiar Character Length
function sliderLength() {
  let slider = document.getElementById('slider')
  let sliderValue = slider.value
  let characterNumber = document.getElementById('characterNumber')
  characterNumber.textContent = sliderValue
  sliderCurrentValue = sliderValue
  return sliderValue
}

document.getElementById('slider').addEventListener('input', sliderLength) // Añadir el evento 'input' solo una vez

sliderLength()

let checkboxes = [
  document.getElementById('upperCase'),
  document.getElementById('lowerCase'),
  document.getElementById('numbers'),
  document.getElementById('symbols'),
]

let checkedCount = 0

//Funcion para obtener numero de checkboxes marcados
function updateCheckedCout() {
  checkedCount = Object.values(checkBoxState).filter(function (value) {
    return value === true
  }).length
  console.log('Numero de checkboxes marcados:', checkedCount)
}
checkboxCounter()

//Funcion checkboxes
function checkboxCounter() {
  checkboxes.forEach(function (checkbox) {
    //checkbox es cada una de las casillas
    checkbox.addEventListener('change', function () {
      let checkboxId = checkbox.id
      checkBoxState[checkboxId] = checkbox.checked
      updateCheckedCout()
      console.log('Slider value:', sliderCurrentValue)
    })
  })
}

//Funcion para manejar el Medidor de Fuerza
function strengthMeter() {
  let button = document.getElementById('generateButton')
  let meter = document.getElementById('meterContainer')
  let tooWeak = document.getElementById('tooWeak')
  let weak = document.getElementById('weak')
  let medium = document.getElementById('medium')
  let strong = document.getElementById('strong')
  let meterText = document.getElementById('strengthWord')

  button.addEventListener('click', function () {
    sliderLength();
    passworGenerator();
    if (checkedCount === 1 && sliderCurrentValue === '5') {
      tooWeak.style.backgroundColor = 'red'
      weak.style.backgroundColor = '#18171F'
      medium.style.backgroundColor = '#18171F'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'TOO WEAK'
      console.log('TOO WEAK')
    } else if (checkedCount === 2 && sliderCurrentValue === '5') {
      tooWeak.style.backgroundColor = 'orange'
      weak.style.backgroundColor = 'orange'
      medium.style.backgroundColor = '#18171F'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'WEAK'
      console.log('Weak')
    } else if (checkedCount === 3 && sliderCurrentValue === '5') {
      tooWeak.style.backgroundColor = 'yellow'
      weak.style.backgroundColor = 'yellow'
      medium.style.backgroundColor = 'yellow'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'MEDIUM'
      console.log('Medium')
    } else if (checkedCount === 4 && sliderCurrentValue === '5') {
      tooWeak.style.backgroundColor = 'green'
      weak.style.backgroundColor = 'green'
      medium.style.backgroundColor = 'green'
      strong.style.backgroundColor = 'green'
      meterText.textContent = 'STRONG'
      console.log('Strong')
    } else if (
      checkedCount === 1 &&
      (sliderCurrentValue === '6' ||
        sliderCurrentValue === '7' ||
        sliderCurrentValue === '8' ||
        sliderCurrentValue === '9' ||
        sliderCurrentValue === '10')
    ) {
      tooWeak.style.backgroundColor = 'orange'
      weak.style.backgroundColor = 'orange'
      medium.style.backgroundColor = '#18171F'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'WEAK'
      console.log('Weak')
    } else if (
      checkedCount === 2 &&
      (sliderCurrentValue === '6' ||
        sliderCurrentValue === '7' ||
        sliderCurrentValue === '8' ||
        sliderCurrentValue === '9' ||
        sliderCurrentValue === '10')
    ) {
      tooWeak.style.backgroundColor = 'yellow'
      weak.style.backgroundColor = 'yellow'
      medium.style.backgroundColor = 'yellow'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'MEDIUM'
      console.log('Medium')
    } else if (
      (checkedCount === 3 || checkedCount === 4) &&
      (sliderCurrentValue === '6' ||
        sliderCurrentValue === '7' ||
        sliderCurrentValue === '8' ||
        sliderCurrentValue === '9' ||
        sliderCurrentValue === '10')
    ) {
      tooWeak.style.backgroundColor = 'green'
      weak.style.backgroundColor = 'green'
      medium.style.backgroundColor = 'green'
      strong.style.backgroundColor = 'green'
      meterText.textContent = 'STRONG'
      console.log('Strong')
    } else if (
      checkedCount === 1 &&
      (sliderCurrentValue === '11' ||
        sliderCurrentValue === '12' ||
        sliderCurrentValue === '13' ||
        sliderCurrentValue === '14' ||
        sliderCurrentValue === '15')
    ) {
      tooWeak.style.backgroundColor = 'yellow'
      weak.style.backgroundColor = 'yellow'
      medium.style.backgroundColor = 'yellow'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'MEDIUM'
      console.log('Medium')
    } else if (
      (checkedCount === 1 ||
        checkedCount === 2 ||
        checkedCount === 3 ||
        checkedCount === 4) &&
      (sliderCurrentValue === '11' ||
        sliderCurrentValue === '12' ||
        sliderCurrentValue === '13' ||
        sliderCurrentValue === '14' ||
        sliderCurrentValue === '15')
    ) {
      tooWeak.style.backgroundColor = 'green'
      weak.style.backgroundColor = 'green'
      medium.style.backgroundColor = 'green'
      strong.style.backgroundColor = 'green'
      meterText.textContent = 'STRONG'
      console.log('Strong')
    } else if (
      (checkedCount === 1 ||
        checkedCount === 2 ||
        checkedCount === 3 ||
        checkedCount === 4) &&
      (sliderCurrentValue === '16' ||
        sliderCurrentValue === '17' ||
        sliderCurrentValue === '18' ||
        sliderCurrentValue === '19' ||
        sliderCurrentValue === '20')
    ) {
      tooWeak.style.backgroundColor = 'green'
      weak.style.backgroundColor = 'green'
      medium.style.backgroundColor = 'green'
      strong.style.backgroundColor = 'green'
      meterText.textContent = 'STRONG'
      console.log('Strong')
    } else if (checkedCount === 0 && sliderCurrentValue === '5') {
      tooWeak.style.backgroundColor = 'red'
      weak.style.backgroundColor = '#18171F'
      medium.style.backgroundColor = '#18171F'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'TOO WEAK'
      console.log('TOO WEAK')
    } else if (
      checkedCount === 0 &&
      (sliderCurrentValue === '6' ||
        sliderCurrentValue === '7' ||
        sliderCurrentValue === '8' ||
        sliderCurrentValue === '9' ||
        sliderCurrentValue === '10')
    ) {
      tooWeak.style.backgroundColor = 'orange'
      weak.style.backgroundColor = 'orange'
      medium.style.backgroundColor = '#18171F'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'WEAK'
      console.log('Weak')
    } else if (
      checkedCount === 0 &&
      (sliderCurrentValue === '11' ||
        sliderCurrentValue === '12' ||
        sliderCurrentValue === '13' ||
        sliderCurrentValue === '14' ||
        sliderCurrentValue === '15')
    ) {
      tooWeak.style.backgroundColor = 'yellow'
      weak.style.backgroundColor = 'yellow'
      medium.style.backgroundColor = 'yellow'
      strong.style.backgroundColor = '#18171F'
      meterText.textContent = 'MEDIUM'
      console.log('Medium')
    } else if (
      checkedCount === 0 &&
      (sliderCurrentValue === '16' ||
        sliderCurrentValue === '17' ||
        sliderCurrentValue === '18' ||
        sliderCurrentValue === '19' ||
        sliderCurrentValue === '20')
    ) {
      tooWeak.style.backgroundColor = 'green'
      weak.style.backgroundColor = 'green'
      medium.style.backgroundColor = 'green'
      strong.style.backgroundColor = 'green'
      meterText.textContent = 'STRONG'
      console.log('Strong')
    }
  })

  //Funcion para generar contrase;a Random
function passworGenerator() {
  let upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  let numbers = '0123456789';
  let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/';

  let allowedChars = '';

  if (!checkboxes[0].checked 
    && !checkboxes[1].checked 
    && !checkboxes[2].checked 
    && !checkboxes[3].checked) {
      allowedChars = lowerCaseLetters;
  } else if (checkboxes[0].checked 
    && !checkboxes[1].checked 
    && !checkboxes[2].checked 
    && !checkboxes[3].checked) {
      allowedChars = lowerCaseLetters, upperCaseLetters;
    }

  if (checkboxes[0].checked === true) {
    allowedChars += upperCaseLetters
  }
  if (checkboxes[1].checked === true) {
    allowedChars += lowerCaseLetters
  }
  if (checkboxes[2].checked === true) {
    allowedChars += numbers
  }
  if (checkboxes[3].checked === true) {
    allowedChars += symbols
  }

  let password = '';
  let passwordLength = sliderLength();
  for (let i = 0; i < passwordLength; i ++) {//Bucle, i es igual a 0, si i es menor a passwordLength, se suma 1 a i
    let randomIndex = Math.floor(Math.random() * allowedChars.length)
    password += allowedChars[randomIndex]
    console.log('Tamano de contrasena:', password);
    let passwordInput = document.getElementById('password');
    passwordInput.textContent = password;

    //Funcion para boton de copiar 
  function copyToClipboard() {
    let copyButton = document.getElementById('copyPasswordButton');
  copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(passwordInput.textContent)
    .then(function() {
      console.log('Se copio la contrasena:', passwordInput.textContent);
    })
  })
  }
  copyToClipboard();
  }
}
}
strengthMeter();



