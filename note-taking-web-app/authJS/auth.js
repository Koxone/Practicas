//Global Variables
let userCredentials = [];
let errorFound = false;
let accessGranted = false;

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
          errorFound = true
        }
      })

      if (errorFound === true) {
        event.preventDefault()
        return
      } else {
        console.log('No errors found')
        // window.location.href = '../index.html'
      }
    })
  })
}
errorHandler()

//Function to stop default action of form
function stopForm() {
    const loginForm = document.getElementById('formLogin');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            return;
        })
    }
}
stopForm()

//Function to handle login with Local Storage Credentials
function loginHandler() {
    const loginButton = document.getElementById('loginButton')
  
    if (loginButton) {
      loginButton.addEventListener('click', (event) => {
        const mailInput = document.getElementById('loginMail')
        const passwordInput = document.getElementById('loginPassword')
  
        if (mailInput.value !== '' && passwordInput.value !== '') {
          let mailValue = mailInput.value
          let passValue = passwordInput.value
  
          const userExists = userCredentials.find(
            (userObj) => userObj.user === mailValue
          )
  
          if (userExists) {
            const passworsIsCorrect = userExists.password === passValue
  
            if (passworsIsCorrect) {
              console.log('Login Granted: User and Password are correct')
              window.location.href = '../index.html';
            } else {
              console.log('Wrong Password')
              return;
            }
          } else {
              console.log('User not found')
              return;
          }
        }
      })
    }
  }
  loginHandler()
