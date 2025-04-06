//Function to handle login with Local Storage Credentials
function loginHandler() {
  const loginButton = document.getElementById('loginButton')

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault()
      const mailInput = document.getElementById('loginMail')
      const passwordInput = document.getElementById('loginPassword')

      if (mailInput.value !== '' && passwordInput.value !== '') {
        let mailValue = mailInput.value
        let passValue = passwordInput.value

        const foundUSer = userCredentials.find(
          (userObj) =>
            userObj.user === mailValue && userObj.password === passValue
        )

        if (foundUSer) {
          console.log('SUCCESS!')
        } else {
          console.log('FAIL!')
        }
      }
    })
  }
}
loginHandler()

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
        //   window.location.href = '../index.html'
      }
    })
  })
}
errorHandler()

//Function to add error classs
function addError() {
  const inputs = document.querySelectorAll(
    '#signUpMail, #signUpPassword, #loginMail, #loginPassword, #newPassword, #confirmNewPassword'
  )
  inputs.forEach((input) => {
    const errorMailOrPass = document.querySelectorAll('.wrongMailOrPassword')
    const errorMessage = input.nextElementSibling

    if (!input.classList.contains('error')) {
      input.classList.add('error')

      errorMailOrPass.forEach((message) => {
        message.style.display = 'block'
      })
      errorMessage.style.display = 'none'
    }
  })
}

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
            window.location.href = '../index.html'
          } else {
            console.log('Wrong Password')
            addError()
            return
          }
        } else {
          console.log('User not found')
          addError()
          return
        }
      }
    })
  }
}
loginHandler()

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
      const userExists = userCredentials.some(
        (credential) => credential.user === user
      )
      if (userExists) {
        console.log('Email already exists')
        return
      }

      if (user === savedCredentials.user) {
        const emailDuplicated = document.querySelector('.emailExistsErrorMessage');
        emailDuplicated.style.display = 'block'
        console.log('User already exists')
        return
      }

      if (user !== '' && password !== '') {
        userCredentials.push({
          user: user,
          password: password,
        })
        localStorage.setItem('Credentials', JSON.stringify(userCredentials))
        console.log('Prueba Credentials:', userCredentials)
        window.location.href = '../index.html'
      } else {
        console.log('There is a field empty')
        event.preventDefault()
        return
      }
    })
  }
}
saveSignUpCredentials()


const emailDuplicated = document.getElementById('emailExistsErrorMessage');
const hideEmptyError = document.querySelectorAll('#errorEmptyEmail, #errorEmptyPassword')
addError()
hideEmptyError.forEach((error) => {
    error.style.display = 'none'
})
emailDuplicated.style.display = 'block'

