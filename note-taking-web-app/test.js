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
