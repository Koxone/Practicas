//Function to save user and password
function saveSignUpCredentials() {
  const inputs = document.querySelectorAll('#signUpMail, #signUpPassword');
  const signUpButton = document.getElementById('signUpButton');
  let user = '';
  let password = '';

  const localStoredCredentials = localStorage.getItem('Credentials');
  if (localStoredCredentials) {
    userCredentials = JSON.parse(localStoredCredentials);
  }

  inputs.forEach((input) => {
    if (input) {
      input.addEventListener('input', (event) => {
        if (event.target.id === 'signUpMail') {
          user = event.target.value;
        } else if (event.target.id === 'signUpPassword') {
          password = event.target.value;
        }
      });
    }
  });

  if (signUpButton) {
    signUpButton.addEventListener('click', (event) => {
      const userExists = userCredentials.some(
        (credential) => credential.user === user
      );
      if (userExists) {
        const emailDuplicated = document.getElementById(
          'emailExistsErrorMessage'
        );
        const hideEmptyError = document.querySelectorAll(
          '#errorEmptyEmail, #errorEmptyPassword'
        );
        addError();
        hideEmptyError.forEach((error) => {
          error.style.display = 'none';
        });
        emailDuplicated.style.display = 'block';
        console.log('Email already exists');
        return;
      }

      if (user === savedCredentials.user) {
        addError();
        console.log('User already exists');
        return;
      }

      if (user !== '' && password !== '') {

        const hashedPassword = CryptoJS.SHA256(password).toString();

        userCredentials.push({
          user: user,
          password: hashedPassword,
        });
        localStorage.setItem('Credentials', JSON.stringify(userCredentials));
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = '../index.html';
      } else {
        console.log('There is a field empty');
        event.preventDefault();
        return;
      }
    });
  }
}
saveSignUpCredentials();

//Function to handle login with Local Storage Credentials
function loginHandler() {
  const loginButton = document.getElementById('loginButton');

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      const mailInput = document.getElementById('loginMail');
      const passwordInput = document.getElementById('loginPassword');

      if (mailInput.value !== '' && passwordInput.value !== '') {
        let mailValue = mailInput.value;
        let passValue = passwordInput.value;

        const userExists = userCredentials.find(
          (userObj) => userObj.user === mailValue);

        if (userExists) {
          const hashedLoginPassword = CryptoJS.SHA256(passValue).toString();
          const passworsIsCorrect = userExists.password === hashedLoginPassword;

          if (passworsIsCorrect) {
            currentUser = userExists.user;
            console.log('Login Granted: User and Password are correct');
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.location.href = '../index.html';
          } else {
            console.log('Wrong Password');
            addError();
            return;
          }
        } else {
          console.log('User not found');
          addError();
          return;
        }
      }
    });
  }
}
loginHandler();