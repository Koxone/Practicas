//Global Variables
let currentUser = localStorage.getItem('currentUser');
let currentFontFamily = localStorage.getItem('currentFontFamily') || 'Inter';
let currentColorTheme = localStorage.getItem('currentColorTheme') || 'Dark Mode';

//Local Storage Variables
let currentUserNotes = JSON.parse(localStorage.getItem('currentUserNotes')) || [];

let currentUserArchivedNotes = JSON.parse(localStorage.getItem('currentUserArchivedNotes')) || [];

//Quick Test Section
console.log('Current User:', currentUser);
console.log('Saved Notes:', currentUserNotes);
console.log('Saved Notes Number:', currentUserNotes.length);
console.log('Archived Notes:', currentUserArchivedNotes);
console.log('Current Font Family:', currentFontFamily);
console.log('Current Color Theme:', currentColorTheme);

//Event Listeners Section

//Functions

//Function to goback to allNotesContainer
function resetUi() {
  const allNotesScreen = document.getElementById('allNotesContainer');
  const newNoteScreen = document.getElementById('newNoteContainer');
  const titleContainer = document.getElementById('titleContainer');
  const openNotesContainer = document.getElementById('openNotesContainer');

  allNotesScreen.style.display = 'flex';
  titleContainer.style.display = 'flex';
  newNoteScreen.style.display = 'none';
  openNotesContainer.style.display = 'none';
}

//Function Footer Buttons Handler
function footerHandler() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.footerButton');

    if (clickedButton && clickedButton.classList.contains('footerButton')) {
      switch (clickedButton.id) {
        case 'homeButton':
          window.location.href = 'index.html';
          break;

        case 'searchButton':
          console.log('Search Button');
          break;

        case 'archivedButton':
          console.log('Archived Button');
          break;

        case 'tagsButton':
          console.log('Tags Button');
          break;

        case 'settingsButton':
          window.location.href = 'settings.html';
          break;

        default:
          console.log('Unkown Button');
      }
    }
  });
}
footerHandler();

//Function to change SRC
function changeSrc(element) {
  const toChangeSrc = element;
  const elementSrc = toChangeSrc.getAttribute('src');
  const newSrc = elementSrc.replace('darkMode', 'lightMode');
  toChangeSrc.setAttribute('src', newSrc);
}

//Function to load notes from wwith login
function loadInitialState() {
  window.addEventListener('DOMContentLoaded', () => {
    const allNotesContainer = document.getElementById('allNotesContainer');
    const titleContainer = document.getElementById('titleContainer');
    const openNotes = document.querySelectorAll('.openNoteContainer');
    const archivedNotesScreen = document.querySelector('.archivedNotesContainer');
    const subtitle = document.querySelector('.archivedNotesSubtitle');
    const logoText = document.querySelector('.logoText');
    const elements = document.querySelectorAll('body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton');
    const backIcon = document.querySelectorAll('.backIcon');

    const arrow = document.querySelector('.backToSettingsButton');
    const leftArrow = arrow ? arrow.querySelector('img') : null;
    const settingsButtons = document.querySelectorAll('.settingsButton');
    const optionsIcons = document.querySelectorAll('#option1Img, #option2Img, #option3Img');

    if (allNotesContainer) {
      allNotesContainer.style.display = 'flex'; //flex
      titleContainer.style.display = 'flex'; //flex
      titleContainer.style.flexDirection = 'unset'; //unset
    }

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

//Function to handle New Note Header Buttons
function noteMenuButtonsHandler() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.backButton, .cancelButton, .saveButton')) {
      resetUi();
    }
  });
}
noteMenuButtonsHandler();

//Function to update UI
function updateUi() {
  const allNotesContainer = document.getElementById('allNotesContainer');

  if (allNotesContainer) {
    allNotesContainer.innerHTML = '';

    currentUserNotes.forEach((note) => {
      const article = document.createElement('article');
      article.classList.add('noteCard');
      article.setAttribute('data-id', note.id);

      const title = document.createElement('h2');
      title.classList.add('noteTitleText');
      title.innerText = note.title;

      const tags = document.createElement('ul');
      tags.classList.add('noteTags');

      const tagsArray = note.tags ? note.tags.split(',') : [];

      tagsArray.forEach((tagText, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('tag');
        span.setAttribute('data-tag', 'tagNumber-' + (index + 1));
        span.innerText = tagText.trim();
        li.appendChild(span);
        tags.appendChild(li);
      });

      const time = document.createElement('time');
      time.classList.add('noteTimeTag');
      time.setAttribute('data-time', note.createdAt);

      const date = new Date(note.createdAt);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      time.innerText = formattedDate;

      article.appendChild(title);
      article.appendChild(tags);
      article.appendChild(time);

      allNotesContainer.appendChild(article);
    });
  }
}
updateUi();

//Function for Create New Note
function newNoteButton() {
  const newNoteButton = document.getElementById('newNoteButton');

  if (newNoteButton) {
    newNoteButton.addEventListener('click', () => {
      const allNotesScreen = document.getElementById('allNotesContainer');
      const newNoteScreen = document.getElementById('newNoteContainer');
      const titleContainer = document.getElementById('titleContainer');
      const archivedNotes = document.querySelector('.allArchivedNotesContainer');

      allNotesScreen.style.display = 'none';
      titleContainer.style.display = 'none';
      archivedNotes.style.display = 'none';
      newNoteScreen.style.display = 'flex';
      console.log('New Note Button');
    });
  }
}
newNoteButton();

//Function to Save New Note
function saveNewNote() {
  const requiredInputs = document.querySelectorAll('.newTitleInput, .newTagsInput');
  const inputsToSave = document.querySelectorAll('.newTitleInput, .newTagsInput, #newNoteTextArea');
  const newNoteSaveButton = document.getElementById('newNoteSaveButton');

  if (newNoteSaveButton) {
    newNoteSaveButton.addEventListener('click', (event) => {
      let title = '';
      let tags = '';
      let content = '';

      let hasError = false;

      requiredInputs.forEach((required) => {
        if (required.value === '') {
          hasError = true;
        }
      });

      if (hasError) {
        alert('Title and Tags cannot be empty');
        return;
      }

      inputsToSave.forEach((input) => {
        if (input.classList.contains('newTitleInput')) {
          title = input.value;
        }

        if (input.classList.contains('newTagsInput')) {
          let inputValue = input.value;
          if (inputValue.includes(',') && inputValue.split(',').every((word) => word.trim() !== '')) {
            tags = input.value;
          } else {
            alert('Tags must be separated by commas');
            event.preventDefault();
            return;
          }
        }

        if (input.id === 'newNoteTextArea') {
          content = input.value;
        }
      });

      if (hasError) {
        event.preventDefault();
        return;
      }

      let nextIdNumber = currentUserNotes.length + 1;

      const newNote = {
        user: currentUser,
        id: 'note-' + nextIdNumber,
        title: title,
        tags: tags,
        content: content,
        createdAt: new Date().toISOString(),
      };

      currentUserNotes.push(newNote);
      localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
      updateUi();
      inputsToSave.forEach((input) => {
        input.value = '';
      });
      console.log('Nota Guardada en Local Storage:', newNote);
      window.location.href = 'index.html';
    });
  }
}
saveNewNote();

//Function for Opening Notes
function openNotes() {
  const openNotesContainer = document.getElementById('openNotesContainer'); //Contenedor padre

  if (openNotesContainer) {
    openNotesContainer.innerHTML = ''; //Vaciamos contenedor padre
    openNotesContainer.style.display = 'flex';

    currentUserNotes.forEach((note) => {
      const openNoteContainer = document.createElement('div'); //Contenedor Hijo, contiene header con botones, spacer y openNote
      openNoteContainer.classList.add('openNoteContainer');
      openNoteContainer.setAttribute('data-id', note.id);
      openNoteContainer.style.display = 'none';

      const header = document.createElement('header');
      header.classList.add('openNoteHeader');

      const backButton = document.createElement('button');
      backButton.classList.add('backButton');
      backButton.innerHTML = `
            <img class="lightMode src" src="./assets/images/icon-arrow-left-darkMode.svg" alt="">
            <span class="backButtonText color"> Go Back </span>
        `;

      const openNoteDeleteButton = document.createElement('button');
      openNoteDeleteButton.classList.add('deleteButton');
      openNoteDeleteButton.innerHTML = `
                <img class="lightMode src" src="./assets/images/icon-delete-darkMode.svg" alt="">
        `;

      const openNoteArchiveButton = document.createElement('button');
      openNoteArchiveButton.classList.add('archiveButton');
      openNoteArchiveButton.innerHTML = `
              <img class="lightMode src"
                    class="lightMode src"
                    src="./assets/images/icon-archive-darkMode.svg"
                    alt=""
                  /> 
        `;

      const openNoteCancelButton = document.createElement('button');
      openNoteCancelButton.classList.add('cancelButton');
      openNoteCancelButton.classList.add('color');
      openNoteCancelButton.innerText = 'Cancel';

      const openNoteSaveButton = document.createElement('button');
      openNoteSaveButton.classList.add('saveButton');
      openNoteSaveButton.innerText = 'Save Note';

      const spacer = document.createElement('div');
      spacer.classList.add('spacer');

      const openNote = document.createElement('div'); //Contenedor con contenedores de titulo,
      openNote.classList.add('openNote');

      const openNoteTitleContainer = document.createElement('div');
      openNoteTitleContainer.classList.add('openNoteTitleContainer');

      const h2 = document.createElement('h2');
      h2.classList.add('openNoteTitle');
      h2.innerText = note.title;

      const openNoteTagsAndDateContainer = document.createElement('div');
      openNoteTagsAndDateContainer.classList.add('openNoteTagsAndDateContainer');

      const openNoteTagsContainer = document.createElement('div');
      openNoteTagsContainer.classList.add('openNoteTagsContainer');

      const tagsIconSpan = document.createElement('span');
      tagsIconSpan.innerHTML = `
                    <img
                    class="lightMode src"
                    src="./assets/images/icon-tag-darkMode.svg"
                    alt=""
                  />
                    <p>Tags</p>
      `;

      const openNoteTagTextContainer = document.createElement('div');
      openNoteTagTextContainer.classList.add('openNoteTagTextContainer');

      let tagsArray = note.tags.split(',');
      tagsArray.forEach((tagText, index) => {
        let tagSpan = document.createElement('span');
        tagSpan.setAttribute('data-tag', 'tagNumber-' + (index + 1));
        tagSpan.innerText = tagText.trim();
        openNoteTagTextContainer.appendChild(tagSpan);
      });

      const openNoteDateContainer = document.createElement('div');
      openNoteDateContainer.classList.add('openNoteDateContainer');
      openNoteDateContainer.innerHTML = `
              <span class="last">
          <img
                    class="lightMode src"
                    src="./assets/images/icon-clock-darkMode.svg"
                    alt=""
                  />
          <p>Last Edited</p>
        </span>
        <div class="openNoteDateTextContainer">
          <span data-time="${note.id}">${new Date(note.createdAt).toLocaleDateString('en-GB')}</span>
        </div>
      `;

      const spacer2 = document.createElement('div');
      spacer2.classList.add('spacer');

      const openNoteTextAreaContainer = document.createElement('div');
      openNoteTextAreaContainer.classList.add('openNoteTextAreaContainer');
      openNoteTextAreaContainer.innerHTML = `
      <textarea class="lightMode color" data-id="${note.id}">${note.content || ''}</textarea>
      `;

      openNoteTitleContainer.appendChild(h2);
      openNoteTagsContainer.append(tagsIconSpan, openNoteTagTextContainer);
      openNoteTagsAndDateContainer.append(openNoteTagsContainer, openNoteDateContainer);
      openNote.append(openNoteTitleContainer, openNoteTagsAndDateContainer, spacer2, openNoteTextAreaContainer);
      header.append(backButton, openNoteDeleteButton, openNoteArchiveButton, openNoteCancelButton, openNoteSaveButton);
      openNoteContainer.append(header, spacer, openNote);
      openNotesContainer.appendChild(openNoteContainer);
    });
  }
}

//Function to Open Notes
function noteOpenHandler() {
  const closeNote = document.querySelectorAll('.noteCard');
  closeNote.forEach((note) => {
    note.addEventListener('click', (event) => {
      console.log('Prueba Data ID:', event.target.getAttribute('data-id'));
      const allNotesScreen = document.getElementById('allNotesContainer');
      const titleContainer = document.getElementById('titleContainer');
      let dataId = note.getAttribute('data-id').trim();
      openNotes();

      setTimeout(() => {
        let target = document.querySelector(`.openNoteContainer[data-id='${dataId}']`);
        if (target) {
          console.log('FUNCIONA');
          allNotesScreen.style.display = 'none';
          titleContainer.style.display = 'none';
          target.style.display = 'flex';
        }
      }, 0);
    });
  });
}
noteOpenHandler();

//Function for Delete and Archive Button
function deleteAndArchiveNotes() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.deleteButton');
    const clickedArchiveButton = event.target.closest('.archiveButton');

    if (clickedButton && clickedButton.classList.contains('deleteButton')) {
      const targetNote = clickedButton.closest('[data-id]');
      if (targetNote) {
        let noteToDelete = targetNote.getAttribute('data-id');

        let userConfirmation = confirm('You are about to delete this note, this action cannot be undone, are you sure?');
        if (userConfirmation) {
          currentUserNotes = currentUserNotes.filter((note) => note.id !== noteToDelete);
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          console.log('Nota Eliminada:', noteToDelete);
          updateUi();
          resetUi();
        }
      }
    } else if (clickedArchiveButton && clickedArchiveButton.classList.contains('archiveButton')) {
      const targetNote = clickedArchiveButton.closest('[data-id]');
      if (targetNote) {
        let noteToArchive = targetNote.getAttribute('data-id');

        let userConfirmation = confirm('Are you shure you want to archive this note?');
        if (userConfirmation) {
          currentUserArchivedNotes = currentUserNotes.filter((note) => note.id === noteToArchive);
          localStorage.setItem('currentUserArchivedNotes', JSON.stringify(currentUserArchivedNotes));
          console.log('Nota Eliminada:', noteToArchive);
          updateUi();
          resetUi();
        }
      }
    }
  });
}
deleteAndArchiveNotes();

//Function to show Archive Notes Screen
function showArchivedNotesScreen() {
  document.addEventListener('click', (event) => {
    const closest = event.target.closest('#archivedButton');

    if (closest) {
      const allNotesContainer = document.getElementById('allNotesContainer');
      const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');
      const subtitle = document.querySelector('.archivedNotesSubtitle');
      const titleContainer = document.getElementById('titleContainer');

      if (allNotesContainer) {
        const titleText = document.getElementById('titleText');
        const spacers = document.querySelectorAll('.spacer');
        spacers.forEach((spacer) => {
          spacer.style.display = 'none';
        });

        allArchivedNotesContainer.style.display = 'flex';
        titleText.textContent = 'Archived Notes';
        titleContainer.style.flexDirection = 'column';
        allNotesContainer.style.display = 'none';
        subtitle.style.display = 'flex';
      } else {
        console.log('Algo no funciona');
      }
    }
  });
}
showArchivedNotesScreen();

//Function for Go back to Settings Button
function goBackToSettingsButton() {
  const backToSettingsButton = document.querySelector('.backToSettingsButton');

  if (backToSettingsButton) {
    backToSettingsButton.addEventListener('click', () => {
      const mainSettingsScreen = document.querySelector('.settingsMenu');
      const openSettingsScreen = document.querySelector('.openSettingContainer');
      const settingsTitle = document.querySelector('.stitleContainer');

      mainSettingsScreen.style.display = 'flex';
      settingsTitle.style.display = 'flex';
      openSettingsScreen.style.display = 'none';
      document.body.style.fontFamily = 'Inter';
    });
  }
}
goBackToSettingsButton();

//Function open Settings Options
function showSettingsOptions() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.settingsButton');

    if (button) {
      const buttonDataSection = button.getAttribute('data-section');
      const mainSettingsScreen = document.querySelector('.settingsMenu');
      const openSettingsScreen = document.querySelector('.openSettingContainer');
      const settingsTitle = document.querySelector('.stitleContainer');

      const images = document.querySelectorAll('#option1Img, #option2Img, #option3Img');
      const tops = document.querySelectorAll('.top');
      const bottoms = document.querySelectorAll('.bottom');
      const options = document.querySelectorAll('.option');

      switch (buttonDataSection) {
        case 'color':
          options.forEach((option) => {
            if (option.classList.contains('font')) {
              option.classList.remove('font');
              option.classList.add('color');
            } else {
              option.classList.add('color');
            }
          });

          if (openSettingsScreen.classList.contains('fontSettings')) {
            openSettingsScreen.classList.remove('fontSettings');
            openSettingsScreen.classList.add('colorSettings');
          } else {
            openSettingsScreen.classList.add('colorSettings');
          }

          images.forEach((image, index) => {
            switch (index) {
              case 0:
                image.src = './assets/images/icon-sun-darkMode.svg';
                break;

              case 1:
                image.src = './assets/images/icon-moon-darkMode.svg';
                break;

              case 2:
                image.src = './assets/images/icon-system-theme-darkMode.svg';
                break;

              default:
                console.log('Index Unkown');
                break;
            }
          });

          tops.forEach((top, index) => {
            switch (index) {
              case 0:
                top.textContent = 'Light Mode';
                break;

              case 1:
                top.textContent = 'Dark Mode';
                break;

              case 2:
                top.textContent = 'System';
                break;

              default:
                console.log('Index Unknown');
                break;
            }
          });

          bottoms.forEach((bottom, index) => {
            switch (index) {
              case 0:
                bottom.textContent = 'Pick a clean and classic light theme';
                break;

              case 1:
                bottom.textContent = 'Select a sleek and modern dark theme';
                break;

              case 2:
                bottom.textContent = 'Adapts to your devices theme';
                break;

              default:
                console.log('Index Unknown');
                break;
            }
          });

          mainSettingsScreen.style.display = 'none';
          settingsTitle.style.display = 'none';
          openSettingsScreen.style.display = 'flex';
          break;

        case 'font':
          options.forEach((option) => {
            if (option.classList.contains('color')) {
              option.classList.remove('color');
              option.classList.add('font');
            } else {
              option.classList.add('font');
            }
          });

          if (openSettingsScreen.classList.contains('colorSettings')) {
            openSettingsScreen.classList.remove('colorSettings');
            openSettingsScreen.classList.add('fontSettings');
          } else {
            openSettingsScreen.classList.add('fontSettings');
          }
          const settingNameTitle = document.getElementById('settingNameTitle');
          const settingNameSubtitle = document.getElementById('settingNameSubtitle');

          settingNameTitle.textContent = 'Font';
          settingNameSubtitle.textContent = 'font';

          images.forEach((image, index) => {
            switch (index) {
              case 0:
                image.src = './assets/images/icon-font-sans-serif-darkMode.svg';
                break;

              case 1:
                image.src = './assets/images/icon-font-serif-darkMode.svg';
                break;

              case 2:
                image.src = './assets/images/icon-font-monospace.svg';
                break;

              default:
                console.log('Index Unkown');
                break;
            }
          });

          tops.forEach((top, index) => {
            switch (index) {
              case 0:
                top.textContent = 'Sans-serif';
                break;

              case 1:
                top.textContent = 'Serif';
                break;

              case 2:
                top.textContent = 'Monospace';
                break;

              default:
                console.log('Index Unkown');
                break;
            }
          });

          bottoms.forEach((bottom, index) => {
            switch (index) {
              case 0:
                bottom.textContent = 'Clean and modern, easy to read.';
                break;

              case 1:
                bottom.textContent = 'Classic and elegant for a timeless feel.';
                break;

              case 2:
                bottom.textContent = 'Code-like, great for a technical vibe.';
                break;

              default:
                console.log('Index Unkown');
                break;
            }
          });

          mainSettingsScreen.style.display = 'none';
          settingsTitle.style.display = 'none';
          openSettingsScreen.style.display = 'flex';
          break;

        default:
          console.log('Error');
          break;
      }
    }
  });
}
showSettingsOptions();

//Function to change Font Theme
function changeFontOrColorTheme() {
  const applyButton = document.getElementById('applyButton');
  const resetButton = document.getElementById('resetButton');
  let fontFamilyselection = undefined;
  let colorThemeSelection = undefined;
  const settingsButtons = document.querySelectorAll('.settingsButton');
  const openSettingsScreen = document.querySelector('.openSettingContainer');
  const elements = document.querySelectorAll('body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton');
  const backIcon = document.querySelectorAll('.backIcon');
  const optionsIcons = document.querySelectorAll('#option1Img, #option2Img, #option3Img');

  document.addEventListener('click', (event) => {
    if (!((event.target.closest('label') && event.target.closest('.font')) || (event.target.closest('label') && event.target.closest('.color')))) {
      return;
    }

    //Change Font Theme
    if (event.target.closest('label') && event.target.closest('.font')) {

      let label = event.target.closest('label');
      let innerText = label.querySelector('.top');

      if (innerText.textContent === 'Sans-serif') {
        document.body.style.fontFamily = 'Open Sans, sans-serif';
        fontFamilyselection = 'Open Sans, sans-serif';
      } else if (innerText.textContent === 'Serif') {
        document.body.style.fontFamily = 'PT Serif, serif';
        fontFamilyselection = 'PT Serif, serif';
      } else if (innerText.textContent === 'Monospace') {
        document.body.style.fontFamily = 'Space Mono, monospace';
        fontFamilyselection = 'Space Mono, monospace';
      }

      //Switch Color Theme
    } else if (event.target.closest('label') && event.target.closest('.color')) {

      const arrow = document.querySelector('.backToSettingsButton');
      const leftArrow = arrow.querySelector('img');
      const images = document.querySelectorAll('#option1Img, #option2Img, #option3Img');

      let label = event.target.closest('label');
      let innerText = label.querySelector('.top');

      //Light Mode
      if (innerText.textContent === 'Light Mode') {

        elements.forEach((element) => {
          if (element.classList.contains('darkMode')) {
            element.classList.remove('darkMode');
            element.classList.add('lightMode');
          } else {
            element.classList.add('lightMode');
          }
        });

        optionsIcons.forEach((icon) => {
          changeSrc(icon);
        });

        backIcon.forEach((icon) => {
          changeSrc(icon);
        });

        images.forEach((image) => {
          changeSrc(image);
        });

        leftArrow.src = './assets/images/icon-arrow-left-lightMode.svg';

        colorThemeSelection = 'lightMode';

        //Dark Mode
      } else if (innerText.textContent === 'Dark Mode') {

        elements.forEach((element) => {
          if (element.classList.contains('lightMode')) {
            element.classList.remove('lightMode');
          }
        });

        images.forEach((image) => {
          changeSrc(image);
        });

        leftArrow.src = './assets/images/icon-arrow-left-darkMode.svg';

        colorThemeSelection = 'darkMode';
      }
    } else {
      return;
    }
  });

  if (applyButton && resetButton) {
    applyButton.addEventListener('click', () => {
      if (openSettingsScreen.classList.contains('colorSettings')) {
        localStorage.setItem('currentColorTheme', colorThemeSelection);
      } else if (openSettingsScreen.classList.contains('fontSettings')) {
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
