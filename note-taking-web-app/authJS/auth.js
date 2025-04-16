//Global Variables
let userCredentials = [];
let errorFound = false;
let currentUser = undefined;
let currentUserReset = localStorage.getItem('currentUser');

//Local Storage Variables
let savedCredentials = localStorage.getItem('Credentials') || '';

//Quick Test Section
console.log('Prueba Credentials Local Storage:', savedCredentials);
console.log('Prueba current User:', currentUserReset);

//Import & Export Section
import { revertSrc } from '../main.js';
import { changeSrc } from '../main.js';
import { loadInitialState } from '../main.js';
import { applyThemeToDynamicContent } from '../main.js';

//Functions Section

//Function to add error classs
function addError() {
  const inputs = document.querySelectorAll('#signUpMail, #signUpPassword, #loginMail, #loginPassword, #newPassword, #confirmNewPassword');
  inputs.forEach((input) => {
    const errorMailOrPass = document.querySelectorAll('.wrongMailOrPassword');
    const errorMessage = input.nextElementSibling;

    if (!input.classList.contains('error')) {
      input.classList.add('error');

      errorMailOrPass.forEach((message) => {
        message.style.display = 'block';
      });
      errorMessage.style.display = 'none';
    }
  });
}

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
      const userExists = userCredentials.some((credential) => credential.user === user);
      if (userExists) {
        const emailDuplicated = document.getElementById('emailExistsErrorMessage');
        const hideEmptyError = document.querySelectorAll('#errorEmptyEmail, #errorEmptyPassword');
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

//Function to show password
function showPassword() {
  const showButtons = document.querySelectorAll('#showPassword, .showPassword');
  showButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const inputPassword = document.querySelectorAll('#signUpPassword, #loginPassword, #newPassword, #confirmNewPassword');

      inputPassword.forEach((input) => {
        if (input.type === 'password') {
          input.type = 'text';
          button.setAttribute('src', '../assets/images/icon-show-password-darkMode.svg');
        } else {
          input.type = 'password';
          button.setAttribute('src', '../assets/images/icon-hide-password-darkMode.svg');
        }
      });
    });
  });
}
showPassword();

//Function for error state
function errorHandler() {
  const inputs = document.querySelectorAll('#signUpMail, #signUpPassword, #loginMail, #loginPassword, #newPassword, #confirmNewPassword');
  const mainButtons = document.querySelectorAll('.mainButton');

  mainButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      inputs.forEach((input) => {
        const errorMessage = input.nextElementSibling;

        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            input.classList.remove('error');
            errorMessage.style.display = 'none';
          }
        });

        if (input.value === '') {
          input.classList.add('error');
          errorMessage.style.display = 'block';
          button.style.marginTop = '8px';
          errorFound = true;
        }
      });

      if (errorFound === true) {
        event.preventDefault();
        return;
      }
    });
  });
}
errorHandler();

//Function to stop default action of form
function stopForm() {
  const loginForm = document.getElementById('formLogin');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      return;
    });
  }
}
stopForm();

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

        const userExists = userCredentials.find((userObj) => userObj.user === mailValue);

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

//Function to show toolTip on Social Media Login Button
function toolTipHandler() {
  const socialButton = document.querySelector('.socialButton');

  if (socialButton) {
    socialButton.addEventListener('mouseenter', () => {
      const toolTip = document.querySelector('.toolTipContainer');
      toolTip.style.display = 'flex';

      socialButton.addEventListener('mouseleave', () => {
        const toolTip = document.querySelector('.toolTipContainer');
        toolTip.style.display = 'none';
      });
    });
  }
}
toolTipHandler();

//Function for Change Password Screen
function changePassword() {
  const newPassword = document.getElementById('newPassword');
  const confirmNewPassword = document.getElementById('confirmNewPassword');
  const resetButton = document.getElementById('resetButton');

  let newValue = '';
  let confirmValue = '';

  if (newPassword) {
    newPassword.addEventListener('input', (event) => {
      newValue = event.target.value;
      console.log('Prueba New:', newValue);
    });
  }

  if (confirmNewPassword) {
    confirmNewPassword.addEventListener('input', (event) => {
      confirmValue = event.target.value;
      console.log('Prueba Confirm:', confirmValue);
    });
  }

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (newValue === confirmValue) {
        const parseSavedCredentials = JSON.parse(savedCredentials);
        const userEmail = JSON.parse(currentUserReset);
        const userIndex = parseSavedCredentials.findIndex((note) => note.user === userEmail);
  
        if (userIndex === -1) {
          console.log('Usuario no encontrado');
          return;
        }
  
        const hashedPassword = CryptoJS.SHA256(newValue).toString();
  
        parseSavedCredentials[userIndex].password = hashedPassword;
        localStorage.setItem('Credentials', JSON.stringify(parseSavedCredentials));
        window.location.href = '../settings.html'
        console.log('Contrase;a Cambiada', );
      }
    });
  }
}
changePassword();

//Function for Go Back to Settings
function goBackToSettings() {
  const goBackToSettings = document.querySelector('.goBackToSettings');

  if (goBackToSettings) {
    goBackToSettings.addEventListener('click', () => {
      window.location.href = '../settings.html';
    })
  }
}
goBackToSettings();