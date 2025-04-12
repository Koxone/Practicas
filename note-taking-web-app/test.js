//Function to load notes from wwith login
function loadInitialState() {
  window.addEventListener('DOMContentLoaded', () => {
    const allNotesContainer = document.getElementById('allNotesContainer');
    const titleContainer = document.getElementById('titleContainer');
    const openNotes = document.querySelectorAll('.openNoteContainer');
    const archivedNotesScreen = document.querySelector('.archivedNotesContainer');
    const subtitle = document.querySelector('.archivedNotesSubtitle');
    const logoText = document.querySelector('.logoText');
    const elements = document.querySelectorAll(
      'body, .mainContainer, .generalContainer, .backButtonText, li, .imgContainer, header, .spacer, .settingsButton, .backIcon'
    );

    const arrow = document.querySelector('.backToSettingsButton');
    const leftArrow = arrow ? arrow.querySelector('img') : null;
    const settingsButtons = document.querySelectorAll('.settingsButton');
    const optionsIcons = document.querySelectorAll('#option1Img, #option2Img, #option3Img');
    const elementsForLightMode = document.querySelectorAll('.color, .src, footer, .fill, .stroke');

    if (allNotesContainer) {
      allNotesContainer.style.display = 'flex'; //flex
      titleContainer.style.display = 'flex'; //flex
      titleContainer.style.flexDirection = 'unset'; //unset
    }

    if (elementsForLightMode) {
      elementsForLightMode.forEach((element) => {
        if ((currentColorTheme === 'lightMode' && element.classList.contains('color'))) {
          element.style.color = 'black';
          element.classList.add('lightMode');
        } else if ((currentColorTheme === 'lightMode' && element.classList.contains('src'))) {
          changeSrc(element);
        } else if ((currentColorTheme === 'lightMode' && element.classList.contains('fill') || element.classList.contains('stroke'))) {
          element.style.fill = 'black';
        } else if ((currentColorTheme === 'lightMode' && element.tagName === 'footer')) {
          element.style.backgroundColor = 'white';
        } else if (element.classList.contains('spacer') && element.classList.contains('lightMode')) {
          element.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        }
      })
    }

    /*
        if (elements) {
      elements.forEach((element) => {
        if (currentColorTheme === 'lightMode') {

          element.classList.add('lightMode');
          if (backIcon) {
            backIcon.forEach((icon) => {
              changeSrc(icon);
            });
          }

          if (optionsIcons) {
            optionsIcons.forEach((icon) => {
              changeSrc(icon);
            });
          }

          if (settingsButtons) {
            settingsButtons.forEach((button) => {
              const img = button.querySelector('img');
              const imgSrc = img.getAttribute('src');
              const newSrc = imgSrc.replace('darkMode', 'lightMode');
              img.setAttribute('src', newSrc);
            });
          }

          if (arrow && leftArrow) {
            leftArrow.src = './assets/images/icon-arrow-left-lightMode.svg';
          }
        } else {
          element.classList.remove('lightMode');
        }
      });
    }
    */

    if (logoText) {
      logoText.style.fontFamily = 'Pacifico';
    }

    if (openNotes) {
      openNotes.forEach((note) => {
        note.style.display = 'none';
      });
    }

    if (archivedNotesScreen) {
      archivedNotesScreen.style.display = 'none'; //none
      subtitle.style.display = 'none'; //none
    }

    document.body.style.fontFamily = `${currentFontFamily}`;
  });
}
loadInitialState();

//Function to change Font Theme
function changeFontOrColorTheme() {
  const applyButton = document.getElementById('applyButton');
  const resetButton = document.getElementById('resetButton');
  const elements = document.querySelectorAll(
    'body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton'
  );

  let fontFamilyselection = undefined;
  let colorThemeSelection = undefined;

  document.addEventListener('click', (event) => {
    
    if (
      !(
        (event.target.closest('label') && event.target.closest('.font')) ||
        (event.target.closest('label') && event.target.closest('.color'))
      )
    ) {
      return;
    }

    let label = event.target.closest('label');
    let innerText = label.querySelector('.top');
    const openSettingContainer = document.querySelector('.openSettingContainer');

    //Change Font Theme
    if (event.target.closest('label') && event.target.closest('.font')) {
      if (innerText.textContent === 'Sans-serif') {
        fontFamilyselection = 'Open Sans, sans-serif';
      } else if (innerText.textContent === 'Serif') {
        fontFamilyselection = 'PT Serif, serif';
      } else if (innerText.textContent === 'Monospace') {
        fontFamilyselection = 'Space Mono, monospace';
      }

      //Switch Color Theme
    } else if (event.target.closest('label') && event.target.closest('.color')) {
      //Light Mode
      if (innerText.textContent === 'Light Mode') {
        colorThemeSelection = 'lightMode';

        //Dark Mode
      } else if (innerText.textContent === 'Dark Mode') {
        colorThemeSelection = 'darkMode';
      }
    } else {
      return;
    }
  });

  if (applyButton && resetButton) {
    applyButton.addEventListener('click', () => {
      if (openSettingContainer.classList.contains('colorSettings')) {
        localStorage.setItem('currentColorTheme', colorThemeSelection);
      } else if (openSettingContainer.classList.contains('fontSettings')) {
        localStorage.setItem('currentFontFamily', fontFamilyselection);
      }
    });

    resetButton.addEventListener('click', () => {
      elements.forEach((element) => {
        element.classList.remove('lightMode');
      });
      localStorage.setItem('currentFontFamily', 'Inter');
      document.body.style.fontFamily = 'Inter';
      console.log('Font Family went back to Inter');
    });
  }
}
changeFontOrColorTheme();

// const settingsButtons = document.querySelectorAll('.settingsButton');
// const openSettingsScreen = document.querySelector('.openSettingContainer');
// const backIcon = document.querySelectorAll('.backIcon');
// const optionsIcons = document.querySelectorAll('#option1Img, #option2Img, #option3Img');
// const arrow = document.querySelector('.backToSettingsButton');
// const leftArrow = arrow.querySelector('img');
// const images = document.querySelectorAll('#option1Img, #option2Img, #option3Img');

// if (innerText.textContent === 'Sans-serif') {
//   document.body.style.fontFamily = 'Open Sans, sans-serif';
//   fontFamilyselection = 'Open Sans, sans-serif';
// } else if (innerText.textContent === 'Serif') {
//   document.body.style.fontFamily = 'PT Serif, serif';
//   fontFamilyselection = 'PT Serif, serif';
// } else if (innerText.textContent === 'Monospace') {
//   document.body.style.fontFamily = 'Space Mono, monospace';
//   fontFamilyselection = 'Space Mono, monospace';
// }

/*
Cambio de SRC:
.src
*/

/*
Cambio de Color Fuente:
.color
*/

/*
Cambio de Color Background:
footer
*/

/*
Cambio de Color Fill:
.fill
.stroke
*/

/*
Cambio de Background Color RGB:
.spacer.lightMode
*/
