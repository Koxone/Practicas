//Global Variables
let userCredentials = []

//Local Storage Variables
let savedCredentials = localStorage.getItem('Credentials') || ''

//Quick Test Section
console.log('Prueba Credentials:', userCredentials)
console.log('Prueba Credentials Local Storage:', savedCredentials)

//Functions Section

//Function to save user and password
function saveSignUpCredentials() {
  const inputs = document.querySelectorAll('#signUpMail, #signUpPassword')
  const signUpButton = document.getElementById('signUpButton')
  let user = ''
  let password = ''

  const localStoredCredentials = localStorage.getItem('Credentials')
  if (localStoredCredentials) {
    userCredentials = JSON.parse(localStoredCredentials)
  }

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener('input', (event) => {
        if (event.target.id === 'signUpMail') {
          user = event.target.value
          console.log('Prueba User:', user)
        } else if (event.target.id === 'signUpPassword') {
          password = event.target.value
          console.log('Prueba Password:', password)
        }
      })
    }
  })

  if (signUpButton) {
    signUpButton.addEventListener('click', (event) => {
      if (user !== '' && password !== '') {
        userCredentials.push({
          user: user,
          password: password,
        })
        localStorage.setItem('Credentials', JSON.stringify(userCredentials))
        console.log('Prueba Credentials:', userCredentials)
      } else {
        console.log('There is a field empty')
        event.preventDefault()
        return
      }
    })
  }
}
saveSignUpCredentials()

//Function to show password
function showPassword() {
  const showButtons = document.querySelectorAll('#showPassword, .showPassword')
  showButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const inputPassword = document.querySelectorAll(
        '#signUpPassword, #loginPassword, #newPassword, #confirmNewPassword'
      )

      inputPassword.forEach((input) => {
        if (input.type === 'password') {
          input.type = 'text'
          button.setAttribute('src', '../assets/images/icon-show-password.svg')
        } else {
          input.type = 'password'
          button.setAttribute('src', '../assets/images/icon-hide-password.svg')
          console.log('no funciona')
        }
      })
    })
  })
}
showPassword()

//Function for error state
function errorHandler() {
  const inputs = document.querySelectorAll(
    '#signUpMail, #signUpPassword, #loginMail, #loginPassword, #newPassword, #confirmNewPassword'
  )
  const mainButtons = document.querySelectorAll('.mainButton')

  mainButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let hasError = false

      inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling

        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            input.classList.remove('error')
            errorMessage.style.display = 'none'
          }
        })

        if (input.value === '') {
          input.classList.add('error')
          errorMessage.style.display = 'block'
          button.style.marginTop = '8px'
          hasError = true
        }
      })

      if (hasError === true) {
        event.preventDefault()
        return
      } else {
        // window.location.href = '../index.html'
      }
    })
  })
}
errorHandler()

//Function to handle login with Local Storage Credentials
function loginHandler() {
    const loginButton = document.getElementById('loginButton')
  
    if (loginButton) {
      loginButton.addEventListener('click', (event) => {
        event.preventDefault()
        const mailInput = document.getElementById('loginMail')
        const passwordInput = document.getElementById('loginPassword')
  
        if (mailInput.value !== '' && passwordInput.value !== '') {
          let mailValue = mailInput.value;
          let passValue = passwordInput.value;

          const foundUSer = userCredentials.find((userObj) => 
            userObj.user === mailValue && userObj.password === passValue);

          if (foundUSer) {
            window.location.href = '../index.html'
          } else {
            console.log('FAIL!')
          }
        }
      })
    }
  }
  loginHandler()
