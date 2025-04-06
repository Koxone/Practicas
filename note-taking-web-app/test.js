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
            console.log('SUCCESS!')
          } else {
            console.log('FAIL!')
          }
        }
      })
    }
  }
  loginHandler()