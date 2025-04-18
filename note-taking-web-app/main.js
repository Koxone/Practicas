//Global Variables
export let currentUser = localStorage.getItem('currentUser');
let currentFontFamily = localStorage.getItem('currentFontFamily') || 'Inter';
let currentColorTheme = localStorage.getItem('currentColorTheme') || 'Dark Mode';

//Local Storage Variables
let currentUserNotes = JSON.parse(localStorage.getItem('currentUserNotes')) || [];

let currentUserArchivedNotes = JSON.parse(localStorage.getItem('currentUserArchivedNotes')) || [];

//Quick Test Section
function quickTest() {
  console.log('Current User:', currentUser);
  console.log('Saved Notes:', currentUserNotes);
  console.log('Saved Notes Number:', currentUserNotes.length);
  console.log('Archived Notes:', currentUserArchivedNotes);
  console.log('Current Font Family:', currentFontFamily);
  console.log('Current Color Theme:', currentColorTheme);
}
quickTest();

//Event Listeners Section

//Functions

//Function to load notes from with login
export function loadInitialState() {
  window.addEventListener(
    'DOMContentLoaded',
    () => {
      const allNotesContainer = document.getElementById('allNotesContainer');
      const titleContainer = document.getElementById('titleContainer');
      const openNotes = document.querySelectorAll('.openNoteContainer');
      const archivedNotesScreen = document.querySelector('.archivedNotesContainer');
      const subtitle = document.querySelector('.archivedNotesSubtitle');
      const logoText = document.querySelector('.logoText');
      const goBackToTags = document.querySelector('.goBackToTags');

      const elementsForLightMode = document.querySelectorAll(
        '.color, .src, footer, .footerButton, .border, .backImgModal, .fill, .backgroundM, .background, .imgContainer, img, .newNoteHeader, .stroke, body, .spacer, .generalContainer, .mainContainer, .mainHeader, .noteCard'
      );

      if (allNotesContainer) {
        allNotesContainer.style.display = 'flex'; //flex
        titleContainer.style.display = 'flex'; //flex
        titleContainer.style.flexDirection = 'column'; //unset
      }

      if (goBackToTags) {
        goBackToTags.style.display = 'none';
      }

      if (elementsForLightMode) {
        elementsForLightMode.forEach((element) => {
          if (currentColorTheme === 'lightMode') {
            switch (true) {
              case element.classList.contains('color'):
                element.style.color = 'black';
                element.classList.add('lightMode');
                break;

              case element.classList.contains('src'):
                changeSrc(element);
                break;

              case element.classList.contains('fill'):
                element.style.fill = 'black';
                break;

              case element.classList.contains('stroke'):
                element.style.stroke = 'black';
                break;

              case element.tagName === 'FOOTER':
                element.style.backgroundColor = 'white';
                element.style.boxShadow = 'none';
                break;

              case element.classList.contains('spacer'):
                element.style.background = 'rgba(224, 228, 234)';
                break;

              case element.classList.contains('mainContainer'):
                element.style.backgroundColor = 'white';
                break;

              case element.classList.length === 1 && element.classList.contains('generalContainer'):
                element.style.backgroundColor = 'white';
                break;

              case element.classList.length === 2 && element.classList.contains('generalContainer') && element.classList.contains('border'):
                element.style.border = '1px solid black';
                element.style.backgroundColor = 'white';
                break;

              case element.tagName === 'BODY':
                element.style.color = 'black';
                break;

              case element.tagName === 'HEADER':
                element.style.backgroundColor = 'white';
                break;

              case element.classList.contains('noteCard'):
                element.style.borderBottom = '1px solid #e0e4ea';
                break;

              case element.classList.contains('footerButton'):
                element.classList.add('lightMode');
                break;

              case element.classList.contains('background'):
                element.style.backgroundColor = '#e0e4ea';
                break;

              case element.classList.contains('imgContainer'):
                element.style.backgroundColor = 'white';
                break;

              case element.classList.contains('border'):
                element.style.border = '1px solid black';
                break;

              case element.classList.contains('backgroundM'):
                element.style.backgroundColor = '#ffffff';
                break;

              case element.classList.contains('backImgModal'):
                element.style.backgroundColor = '#ffffff';
            }
          } else if (currentColorTheme === 'darkMode') {
            switch (true) {
              case element.classList.contains('color'):
                element.style.color = 'white';
                element.classList.remove('lightMode');
                break;

              case element.classList.contains('src'):
                revertSrc(element);
                break;

              case element.classList.contains('fill'):
                element.style.fill = 'white';
                break;

              case element.classList.contains('stroke'):
                element.style.stroke = 'white';
                break;

              case element.tagName === 'FOOTER':
                element.style.backgroundColor = '#0e1218';
                break;

              case element.classList.contains('spacer'):
                element.style.background = '#232530';
                break;

              case element.classList.contains('mainContainer') || element.classList.contains('generalContainer'):
                element.style.backgroundColor = '#0e1218';
                break;

              case element.tagName === 'BODY':
                element.style.color = 'white';
                break;

              case element.classList.contains('mainHeader'):
                element.style.backgroundColor = '#232530';
                break;

              case element.classList.contains('newNoteHeader'):
                element.style.backgroundColor = '#0e1218';

              case element.classList.contains('noteCard'):
                element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.04)';
                break;

              case element.classList.contains('footerButton'):
                element.classList.remove('lightMode');
                break;

              case element.classList.contains('background'):
                element.style.backgroundColor = '#525866';
                break;

              case element.classList.contains('backgroundM'):
                element.style.backgroundColor = '#2a3038';
                break;
            }
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

      if (currentFontFamily === 'Space Mono, monospace') {
        const modalFont = document.querySelector('.modalTextBottom ');
        if (modalFont) {
          modalFont.style.fontSize = '11px';
        }
      }
      document.body.style.fontFamily = `${currentFontFamily}`;

      const params = new URLSearchParams(window.location.search);
      const from = params.get('from');
      const section = params.get('section');

      setTimeout(() => {
        if (from === 'settings') {
          settingsFooterButtonsClickSimulator(section);
        }
      });
    },
    50
  );
}
loadInitialState();

//Settings footer buttons handler
function settingsFooterButtonsHandler() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.settingsFooterButton');
    if (!clickedButton || !clickedButton.classList.contains('settingsFooterButton')) return;

    switch (clickedButton.id) {
      case 'homeButton':
        window.location.href = 'index.html';
        break;

      case 'searchButton':
        if (window.location.pathname.includes('settings.html')) {
          window.location.href = 'index.html?from=settings&section=search';
        }
        break;

      case 'archivedButton':
        if (window.location.pathname.includes('settings.html')) {
          window.location.href = 'index.html?from=settings&section=archive';
        }
        break;

      case 'tagsButton':
        if (window.location.pathname.includes('settings.html')) {
          window.location.href = 'index.html?from=settings&section=tags';
        }
        break;

      case 'settingsButton':
        console.log('Already in Settings');
        break;

      default:
        console.log('Unkown Button');
    }
  });
}
settingsFooterButtonsHandler();

//Function to show Sections
function showFooterSections(sectionId) {
  const button = document.getElementById(sectionId);

  if (!button) {
    console.log('Error en showFooterSections');
    return;
  }

  button.click();
}

//Function to show Archive Notes Screen
function settingsFooterButtonsClickSimulator(section) {
  switch (section) {
    case 'archive':
      showFooterSections('archivedButton');
      break;

    case 'search':
      showFooterSections('searchButton');
      break;

    case 'tags':
      showFooterSections('tagsButton');
      break;

    case 'home':
      showFooterSections('homeButton');
      break;
  }
}

//Function to show Footer Buttons Screens
function showMainFooterMenuScreens() {
  document.addEventListener('click', (event) => {
    if (
      !(
        event.target.closest('#searchButton') ||
        event.target.closest('#tagsButton') ||
        event.target.closest('#archivedButton') ||
        event.target.closest('#goBackToTags') ||
        event.target.closest('#homeButton')
      )
    )
      return;

    const titleText = document.getElementById('titleText');
    const clickedButton = event.target.closest('.footerButton') || event.target.closest('#goBackToTags');

    const elementsToHideSearch = document.querySelectorAll(
      '.tagsListContainer, #openNotesContainer, #allArchivedNotesContainer, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );
    const elementsToShowSearch = document.querySelectorAll('.subtitleSearch, #titleContainer, #allNotesContainer, .searchEngineContainer');

    const elementsToShowTags = document.querySelectorAll('.tagsListContainer, #titleContainer');
    const elementsToHideTags = document.querySelectorAll(
      '#allNotesContainer, #openNotesContainer, #searchEngineContainer, #allArchivedNotesContainer, #goBackToTags, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );

    const elementsToShowArchive = document.querySelectorAll('.allArchivedNotesContainer, .spacer, .archivedNotesSubtitle, #titleContainer, .spacer');
    const elementsToHideArchive = document.querySelectorAll(
      '#searchEngineContainer, #openNotesContainer, #subtitleSearch, #newNoteContainer, #allNotesContainer, #newNoteButton, .tagsListContainer'
    );

    if (!clickedButton) return;

    const buttonId = clickedButton.id;

    switch (buttonId) {
      case 'searchButton':
        elementsToHideSearch.forEach((element) => {
          element.style.display = 'none';
        });

        elementsToShowSearch.forEach((element) => {
          element.style.display = 'flex';
        });

        titleText.textContent = 'Search';
        searchNotes();
        break;

      case 'homeButton':
        window.location.href = 'index.html';
        console.log('Search Works');
        break;

      case 'tagsButton':
        elementsToHideTags.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowTags.forEach((element) => {
          element.style.display = 'flex';
        });
        titleText.textContent = 'Tags';
        break;

      case 'goBackToTags':
        elementsToHideTags.forEach((element) => {
          element.style.display = 'none';
        });
        elementsToShowTags.forEach((element) => {
          element.style.display = 'flex';
        });
        titleText.textContent = 'Tags';
        break;

      case 'archivedButton':
        console.log('Funciona Archived Kox');
        elementsToShowArchive.forEach((element) => {
          element.style.display = 'flex';
        });
        elementsToHideArchive.forEach((element) => {
          element.style.display = 'none';
        });
        titleText.textContent = 'Archived Notes';
        break;

      default:
        console.log('Error en showFooterMenuScreens');
    }
  });
}
showMainFooterMenuScreens();

//Function for search engine
function searchNotes() {
  const searchEngine = document.getElementById('searchEngine');

  searchEngine.addEventListener('input', (event) => {
    const userSearch = event.target.value.toLowerCase().trim();
    const searchedText = document.querySelector('.userSearch');

    if (searchedText) {
      searchedText.textContent = `${event.target.value}`;
    }

    const filteredNotes = currentUserNotes.filter((note) => note.user === currentUser && note.title.toLowerCase().includes(userSearch));

    renderSearchNotes(filteredNotes);
  });
}

//Function to change SRC
export function changeSrc(element) {
  const toChangeSrc = element;
  const elementSrc = toChangeSrc.getAttribute('src');
  const newSrc = elementSrc.replace('darkMode', 'lightMode');
  toChangeSrc.setAttribute('src', newSrc);
}

//Function to revert SRC
export function revertSrc(element) {
  const toChangeSrc = element;
  const elementSrc = toChangeSrc.getAttribute('src');
  const newSrc = elementSrc.replace('lightMode', 'darkMode');
  toChangeSrc.setAttribute('src', newSrc);
}

//Function for dinamic created elements
export function applyThemeToDynamicContent(theme) {
  const elementsForLightMode = document.querySelectorAll(
    '.color, .background, .imgContainer, .src, textarea, .fill, .border, img, .stroke, footer, li, .footerButton, body, .spacer, .generalContainer, .mainContainer, .mainHeader, .noteCard'
  );

  if (theme === 'lightMode') {
    elementsForLightMode.forEach((element) => {
      switch (true) {
        case element.classList.contains('color'):
          element.style.color = 'black';
          break;

        case element.classList.contains('src'):
          changeSrc(element);
          break;

        case element.classList.contains('fill'):
          element.style.fill = 'black';
          break;

        case element.classList.contains('stroke'):
          element.style.stroke = 'black';
          break;

        case element.tagName === 'FOOTER':
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('spacer'):
          element.style.background = 'rgba(224, 228, 234)';
          break;

        case element.classList.contains('generalContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('mainContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.tagName === 'BODY':
          element.style.color = 'black';
          break;

        case element.tagName === 'HEADER':
          element.style.backgroundColor = 'white';
          break;

        case element.classList.contains('noteCard'):
          element.style.borderBottom = '1px solid #e0e4ea';
          break;

        case element.classList.contains('footerButton'):
          element.classList.add('lightMode');
          break;

        case element.classList.contains('background'):
          element.style.backgroundColor = '#e0e4ea';
          break;

        case element.tagName === 'TEXTAREA':
          element.style.color = 'black';
          break;

        case element.classList.contains('imgContainer'):
          element.style.backgroundColor = 'white';
          break;

        case element.tagName === 'IMG' && element.classList.contains('src'):
          changeSrc(element);
          break;

        case element.classList.contains('border'):
          element.style.border = '1px solid #e0e4ea';
          break;
      }
    });
  } else if (theme === 'darkMode') {
    elementsForLightMode.forEach((element) => {
      switch (true) {
        case element.classList.contains('color'):
          element.style.color = 'white';
          element.classList.remove('lightMode');
          break;

        case element.classList.contains('src'):
          revertSrc(element);
          break;

        case element.classList.contains('fill'):
          element.style.fill = 'white';
          break;

        case element.classList.contains('stroke'):
          element.style.stroke = 'white';
          break;

        case element.tagName === 'FOOTER':
          element.style.backgroundColor = '#0e1218';
          break;

        case element.classList.contains('spacer'):
          element.style.background = '#232530';
          break;

        case element.classList.contains('mainContainer') || element.classList.contains('generalContainer'):
          element.style.backgroundColor = '#0e1218';
          break;

        case element.tagName === 'BODY':
          element.style.color = 'white';
          break;

        case element.classList.contains('mainContainer'):
          element.style.backgroundColor = '#232530';
          break;

        case element.classList.contains('newNoteHeader'):
          element.style.backgroundColor = '#0e1218';
          break;

        case element.classList.contains('noteCard'):
          element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.04)';
          break;

        case element.classList.contains('footerButton'):
          element.classList.remove('lightMode');
          break;

        case element.classList.contains('background'):
          element.style.backgroundColor = '#525866';
          break;

        case element.classList.contains('imgContainer'):
          element.style.backgroundColor = '#0e1218';
          break;
      }
    });
  }
}

//Function to change Font And Color Theme
export function changeFontOrColorTheme() {
  const applyButton = document.getElementById('applyButton');
  const resetButton = document.getElementById('resetButton');
  const elements = document.querySelectorAll('body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton');

  let fontFamilyselection = currentFontFamily;
  let colorThemeSelection = currentColorTheme;

  document.addEventListener('click', (event) => {
    if (!((event.target.closest('label') && event.target.closest('.font')) || (event.target.closest('label') && event.target.closest('.color')))) {
      return;
    }

    let label = event.target.closest('label');
    let innerText = label.querySelector('.top');

    //Change Font Theme
    if (event.target.closest('label') && event.target.closest('.font')) {
      if (innerText.textContent === 'Sans-serif') {
        fontFamilyselection = 'Open Sans, sans-serif';
        document.body.style.fontFamily = 'Open Sans, sans-serif';
      } else if (innerText.textContent === 'Serif') {
        fontFamilyselection = 'PT Serif, serif';
        document.body.style.fontFamily = 'PT Serif, serif';
      } else if (innerText.textContent === 'Monospace') {
        fontFamilyselection = 'Space Mono, monospace';
        document.body.style.fontFamily = 'Space Mono, monospace';
      }

      //Switch Color Theme
    } else if (event.target.closest('label') && event.target.closest('.color')) {
      //Light Mode

      if (!innerText) return;

      if (innerText.textContent === 'Light Mode') {
        colorThemeSelection = 'lightMode';
        // applyThemeToDynamicContent('lightMode');

        //Dark Mode
      } else if (innerText.textContent === 'Dark Mode') {
        colorThemeSelection = 'darkMode';
        // applyThemeToDynamicContent('darkMode');
      }
    } else {
      return;
    }
  });

  if (applyButton && resetButton) {
    applyButton.addEventListener('click', () => {
      const openSettingContainer = document.querySelector('.openSettingContainer');
      const mainHeader = document.querySelector('.mainHeader');
      mainHeader.style.backgroundColor = 'rgb(35, 37, 48)';
      if (openSettingContainer.classList.contains('colorSettings')) {
        localStorage.setItem('currentColorTheme', colorThemeSelection);
        currentColorTheme = colorThemeSelection;
        applyThemeToDynamicContent(colorThemeSelection);
      } else if (openSettingContainer.classList.contains('fontSettings')) {
        localStorage.setItem('currentFontFamily', fontFamilyselection);
        currentFontFamily = fontFamilyselection;
        document.body.style.fontFamily = currentFontFamily;
      }
    });

    resetButton.addEventListener('click', () => {
      const openSettingContainer = document.querySelector('.openSettingContainer');

      if (openSettingContainer.classList.contains('colorSettings')) {
        currentColorTheme = colorThemeSelection;
        localStorage.setItem('currentColorTheme', 'darkMode');
        location.reload();
      } else if (openSettingContainer.classList.contains('fontSettings')) {
        localStorage.setItem('currentFontFamily', 'Inter');
        currentFontFamily = 'Inter';
        document.body.style.fontFamily = 'Inter';
      }
    });
  }
}
changeFontOrColorTheme();

//Function to handle New Note Header Buttons
function backAndCancelButtonHandler() {
  const archivedNotesContainer = document.getElementById('allArchivedNotesContainer');
  const allNotesContainer = document.getElementById('allNotesContainer');
  const openNotesContainer = document.getElementById('openNotesContainer');
  const newNoteContainer = document.getElementById('newNoteContainer');
  const titleContainer = document.getElementById('titleContainer');

  document.addEventListener('click', (event) => {
    const backOrCancel = event.target.closest('.backButton, .cancelButton');

    if (!backOrCancel) return;

    titleContainer.style.display = 'flex';
    const container = event.target.closest('.openArchivedNoteContainer, .openNoteContainer, .newNoteContainer');

    switch (true) {
      case container?.classList.contains('openArchivedNoteContainer'):
        archivedNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        break;

      case container?.classList.contains('openNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        break;

      case container?.classList.contains('newNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        newNoteContainer.style.display = 'none';
        break;

      default:
        console.log('noteMenuButtonsHandler is not working');
    }
  });
}
backAndCancelButtonHandler();

//Function to update UI depending on which user are logged in
function renderSearchNotes(notesArray) {
  const allNotesContainer = document.getElementById('allNotesContainer');

  if (allNotesContainer) {
    allNotesContainer.innerHTML = '';

    notesArray
      .filter((note) => note.user === currentUser)
      .forEach((note) => {
        const article = document.createElement('article');
        article.classList.add('noteCard');
        article.classList.add('regularNote');
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
          li.classList.add('background');
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

    noteOpenHandler();
  }
}

//Function to update UI depending on which user are logged in
function updateUi() {
  const allNotesContainer = document.getElementById('allNotesContainer');
  const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');

  if (allNotesContainer) {
    allNotesContainer.innerHTML = '';

    const filteredNotes = currentUserNotes.filter((note) => note.user === currentUser);
    renderSearchNotes(filteredNotes);
  }

  if (allArchivedNotesContainer) {
    allArchivedNotesContainer.innerHTML = '';

    currentUserArchivedNotes
      .filter((note) => note.user === currentUser)
      .forEach((note) => {
        const article = document.createElement('article');
        article.classList.add('noteCard');
        article.classList.add('archivedNoteCard');
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
          li.classList.add('background');
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

        allArchivedNotesContainer.appendChild(article);
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
      const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
      const openNotesContainer = document.getElementById('openNotesContainer');
      const archivedNotes = document.querySelector('.allArchivedNotesContainer');

      openNotesContainer.style.display = 'none';
      allArchivedNotesContainer.style.display = 'none';
      allNotesScreen.style.display = 'none';
      titleContainer.style.display = 'none';
      archivedNotes.style.display = 'none';
      newNoteScreen.style.display = 'flex';
      console.log('New Note Button');
      applyThemeToDynamicContent(currentColorTheme);
    });
  }
}
newNoteButton();

//Function to show Toast
function showToast(element) {
  const toastContainer = document.querySelector('.toastContainer');
  const toastText = toastContainer.querySelector('p');

  switch (element) {
    case 'newNote':
      toastText.textContent = 'Note saved successfully!';
      break;

    case 'archived':
      toastText.textContent = 'Note succesfully archived!';
      break;

    case 'delete':
      toastText.textContent = 'Note succesfully deleted!';
      break;

    default:
      console.log('Algo esta mal con showToast');
  }

  toastContainer.classList.add('active');
  setTimeout(() => {
    toastContainer.classList.remove('active');
  }, 2000);
}

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

      const noteNumbers = currentUserNotes.map((note) => {
        return parseInt(note.id.split('-')[1], 10);
      });

      const highestNumber = noteNumbers.length > 0 ? Math.max(...noteNumbers) : 0;
      let nextIdNumber = highestNumber + 1;

      const newNote = {
        user: currentUser,
        id: 'note-' + nextIdNumber,
        title: title,
        tags: tags,
        content: content,
        createdAt: new Date().toISOString(),
        status: 'active',
      };

      currentUserNotes.push(newNote);
      localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
      updateUi();
      showNotesByTag();
      inputsToSave.forEach((input) => {
        input.value = '';
      });
      showToast('newNote');

      newNoteContainer.style.display = 'none';
      allNotesContainer.style.display = 'flex';
      titleContainer.style.display = 'flex';
      console.log('Nota Guardada en Local Storage:', newNote);
    });
  }
}
saveNewNote();

//Function for Opening Notes
function openNotes(category) {
  const openNotesContainer = document.getElementById('openNotesContainer');
  const isArchived = category === currentUserArchivedNotes;

  openNotesContainer.innerHTML = '';
  openNotesContainer.style.display = 'flex';

  category.forEach((note) => {
    const openNoteContainer = document.createElement('div');
    openNoteContainer.classList.add(isArchived ? 'openArchivedNoteContainer' : 'openNoteContainer');
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

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteButton');
    deleteButton.innerHTML = `
      <img class="lightMode src" src="./assets/images/icon-delete-darkMode.svg" alt="">
    `;

    const archiveButton = document.createElement('button');
    archiveButton.classList.add('archiveButton');
    archiveButton.innerHTML = `
      <img class="lightMode src" src="./assets/images/icon-archive-darkMode.svg" alt="" />
    `;
    if (isArchived) {
      archiveButton.classList.remove('archiveButton');
      archiveButton.classList.add('restore');
      archiveButton.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-restore-darkMode.svg" alt="" />
      `;
    }

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancelButton');
    cancelButton.classList.add('color');
    cancelButton.innerText = 'Cancel';

    const saveButton = document.createElement('button');
    saveButton.classList.add('saveButton');
    saveButton.innerText = 'Save Note';
    if (isArchived) saveButton.disabled = true;

    const spacer = document.createElement('div');
    spacer.classList.add('spacer');

    const openNote = document.createElement('div');
    openNote.classList.add('openNote');
    if (isArchived) {
      openNote.classList.add('openArchivedNote');
    }

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
      <img class="lightMode src" src="./assets/images/icon-tag-darkMode.svg" alt="" />
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

    openNoteTagsContainer.append(tagsIconSpan, openNoteTagTextContainer);

    if (isArchived) {
      const statusContainer = document.createElement('div');
      statusContainer.classList.add('statusContainer');

      const statusIcon = document.createElement('span');
      statusIcon.classList.add('statusIcon');
      statusIcon.innerHTML = `
        <img class="lightMode src" src="./assets/images/icon-status-darkMode.svg" alt="" />
        <p>Status</p>
      `;

      const statusTextContainer = document.createElement('div');
      statusTextContainer.classList.add('statusTextContainer');
      statusTextContainer.textContent = 'Archived';

      statusContainer.append(statusIcon, statusTextContainer);
      openNoteTagsAndDateContainer.append(openNoteTagsContainer, statusContainer);
    } else {
      openNoteTagsAndDateContainer.append(openNoteTagsContainer);
    }

    const openNoteDateContainer = document.createElement('div');
    openNoteDateContainer.classList.add('openNoteDateContainer');
    openNoteDateContainer.innerHTML = `
      <span class="last">
        <img class="lightMode src" src="./assets/images/icon-clock-darkMode.svg" alt="" />
        <p>Last Edited</p>
      </span>
      <div class="openNoteDateTextContainer">
        <span data-time="${note.id}">${new Date(note.createdAt).toLocaleDateString('en-GB')}</span>
      </div>
    `;

    openNoteTagsAndDateContainer.append(openNoteDateContainer);

    const spacer2 = document.createElement('div');
    spacer2.classList.add('spacer');

    const openNoteTextAreaContainer = document.createElement('div');
    openNoteTextAreaContainer.classList.add('openNoteTextAreaContainer');
    openNoteTextAreaContainer.innerHTML = `
      <textarea class="lightMode color" data-id="${note.id}" ${isArchived ? 'disabled' : ''}>${note.content || ''}</textarea>
    `;

    openNoteTitleContainer.appendChild(h2);
    openNote.append(openNoteTitleContainer, openNoteTagsAndDateContainer, spacer2, openNoteTextAreaContainer);
    header.append(backButton, deleteButton, archiveButton, cancelButton, saveButton);
    openNoteContainer.append(header, spacer, openNote);
    openNotesContainer.appendChild(openNoteContainer);

    applyThemeToDynamicContent(currentColorTheme);
  });
}

//Function to Open Notes
function noteOpenHandler() {
  const closeNote = document.querySelectorAll('.noteCard');

  closeNote.forEach((note) => {
    note.addEventListener('click', (event) => {
      const allNotesScreen = document.getElementById('allNotesContainer');
      const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
      const titleContainer = document.getElementById('titleContainer');
      let dataId = note.getAttribute('data-id').trim();

      const isArchived = note.classList.contains('archivedNoteCard');
      const category = isArchived ? currentUserArchivedNotes : currentUserNotes;
      const selector = isArchived ? '.openArchivedNoteContainer' : '.openNoteContainer';

      openNotes(category);

      setTimeout(() => {
        let target = document.querySelector(`${selector}[data-id="${dataId}"]`);
        if (target) {
          allNotesScreen.style.display = 'none';
          allArchivedNotesContainer.style.display = 'none';
          titleContainer.style.display = 'none';
          target.style.display = 'flex';
          target.style.flexDirection = 'column';
        }
      }, 0);
    });
  });
}
noteOpenHandler();

//Function to close Modal
function closeModal() {
  const modal = document.querySelector('.modal');
  const overlay = document.getElementById('overlay');
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

//Function to show Modal
function showModal({ type, topText, bottomText, buttonText, imgSrc }) {
  const modal = document.querySelector('.modal');
  const modalCancelButton = document.querySelector('.modalCancelButton');
  const modalRightButton = document.querySelector('.modalRightButton');
  const modalTextTop = document.querySelector('.modalTextTop');
  const modalTextBottom = document.querySelector('.modalTextBottom');
  const modalImg = document.getElementById('modalImg');
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  modal.style.display = 'flex';

  modalRightButton.textContent = buttonText;
  modalTextTop.textContent = topText;
  modalTextBottom.textContent = bottomText;

  modalImg.setAttribute('src', imgSrc);
  if (currentColorTheme === 'lightMode') changeSrc(modalImg);

  modalRightButton.className = 'modalRightButton';
  modalRightButton.classList.add(`modal${type}Button`);

  modalCancelButton.addEventListener('click', closeModal);

  return modalRightButton;
}

//Function for Delete and Archive Button
function deleteAndArchiveNotes() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.deleteButton');
    const clickedArchiveButton = event.target.closest('.archiveButton');
    const clickedRestoreButton = event.target.closest('.restore');

    //DELETE
    if (clickedButton) {
      const targetNote = clickedButton.closest('[data-id]');
      if (targetNote) {
        let noteToDelete = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Delete',
          topText: 'Delete Note',
          bottomText: 'Are you sure you want to permanently delete this note? This action cannot be undone.',
          buttonText: 'Delete Note',
          imgSrc: './assets/images/icon-delete-darkMode.svg',
        });

        modalBtn.onclick = () => {
          currentUserNotes = currentUserNotes.filter((note) => note.id !== noteToDelete);
          currentUserArchivedNotes = currentUserArchivedNotes.filter((note) => note.id !== noteToDelete);
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          localStorage.setItem('currentUserArchivedNotes', JSON.stringify(currentUserArchivedNotes));
          console.log('Nota Eliminada:', noteToDelete);
          window.location.href = 'index.html';
          modal.style.display = 'none';
          modalRightButton.classList.remove('modalDeleteButton');
          overlay.style.display = 'none';
          updateUi();
          showToast('delete');
        };
      }
      //ARCHIVE
    } else if (clickedArchiveButton) {
      const targetNote = clickedArchiveButton.closest('[data-id]');
      if (targetNote) {
        let noteToArchive = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Archive',
          topText: 'Archive Note',
          bottomText: 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.',
          buttonText: 'Archive Note',
          imgSrc: './assets/images/icon-archive-lightMode.svg',
        });

        modalBtn.onclick = () => {
          let archivedNote = currentUserNotes.find((note) => {
            return note.id === noteToArchive;
          });

          let noteStatus = currentUserNotes.find((note) => note.id === noteToArchive);

          if (noteStatus) {
            noteStatus.status = 'archived';
          }

          if (archivedNote) {
            currentUserArchivedNotes.push(archivedNote);
          }

          currentUserNotes = currentUserNotes.filter((note) => note.id !== noteToArchive);

          localStorage.setItem('currentUserArchivedNotes', JSON.stringify(currentUserArchivedNotes));
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          console.log('Nota Eliminada:', noteToArchive);
          window.location.href = 'index.html';
          updateUi();
          showToast('archived');
        };
      }
      //RESTORE
    } else if (clickedRestoreButton) {
      const targetNote = clickedRestoreButton.closest('[data-id]');
      if (targetNote) {
        let noteToRestore = targetNote.getAttribute('data-id');

        const modalBtn = showModal({
          type: 'Restore',
          topText: 'Restore Note',
          bottomText: 'Are you sure you want to restore thi note to All Notes Section?',
          buttonText: 'Restore Note',
          imgSrc: './assets/images/icon-restore-darkMode.svg',
        });

        modalBtn.onclick = () => {
          let noteStatus = currentUserArchivedNotes.find((note) => note.id === noteToRestore);

          if (noteStatus) {
            noteStatus.status = 'active';
          }
          let restoredNote = currentUserArchivedNotes.find((note) => {
            return note.id === noteToRestore;
          });

          if (restoredNote) {
            currentUserNotes.push(restoredNote);
          }

          currentUserArchivedNotes = currentUserArchivedNotes.filter((note) => note.id !== noteToRestore);

          localStorage.setItem('currentUserArchivedNotes', JSON.stringify(currentUserArchivedNotes));
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          console.log('Note Restore:', noteToRestore);
          window.location.href = 'index.html';
          updateUi();
          showToast('restore');
        };
      }
    }
    showNotesByTag();
  });
}
deleteAndArchiveNotes();

//Function to open an Archive Note
function openArchivedNote() {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('button')) {
      return;
    }

    const archiveButton = event.target.closest('button').classList.contains('footerButton');
    const archiveButtonId = event.target.closest('button').id;

    if (!(archiveButton && archiveButtonId)) {
      return;
    }

    if (archiveButton && archiveButtonId) {
      console.log('Archive Button BIEN');
    } else {
      return;
    }
  });
}
openArchivedNote();

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
                image.src = './assets/images/icon-font-monospace-darkMode.svg';
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
    applyThemeToDynamicContent(currentColorTheme);
  });
}
showSettingsOptions();

//Function edit and save existing notes
function editAndSaveNotes() {
  let content = '';
  let noteId = '';

  document.addEventListener('click', (event) => {
    const noteCardClicked = event.target.closest('.noteCard');

    if (noteCardClicked) {
      noteId = noteCardClicked.getAttribute('data-id');
      const textarea = document.querySelector(`textarea[data-id="${noteId}"]`);

      if (textarea) {
        textarea.addEventListener('input', (event) => {
          content = event.target.value;
        });
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('saveButton')) {
      if (noteId && content !== '') {
        const noteToEdit = currentUserNotes.find((note) => note.id === noteId);

        if (noteToEdit) {
          noteToEdit.content = content;
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          window.location.href = 'index.html';
          console.log('Nota Actualizada:', noteToEdit);
        }
      }
    }
    showNotesByTag();
  });
}
editAndSaveNotes();

//Function to show Notes by Tag
function showNotesByTag() {
  const tagsListContainer = document.querySelector('.tagsListContainer');
  const allNotesContainer = document.getElementById('allNotesContainer');
  if (!tagsListContainer) return;

  const existingTags = currentUserNotes
    .filter((note) => note.user === currentUser)
    .flatMap((note) => note.tags.split(',').map((tag) => tag.trim()))
    .filter((tag, index, self) => self.indexOf(tag) === index);

  const sortedTags = existingTags.sort((a, b) => a.localeCompare(b));

  tagsListContainer.innerHTML = '';

  const tagsUl = document.createElement('ul');
  tagsUl.classList.add('tagsUl');

  sortedTags.forEach((tag) => {
    const li = document.createElement('li');
    li.classList.add('tagElement');
    li.setAttribute('data-tag', tag);

    li.addEventListener('click', () => {
      const goBackToTags = document.querySelector('.goBackToTags');
      goBackToTags.style.display = 'flex';
      document.querySelectorAll('.tagElement').forEach((tagEl) => {
        tagEl.classList.remove('activeTag');
      });

      li.classList.add('activeTag');
      li.classList.add('background');

      const filteredNotes = currentUserNotes.filter((note) => {
        const noteTagsArray = note.tags.split(',').map((t) => t.trim());
        return note.user === currentUser && noteTagsArray.includes(tag);
      });

      renderSearchNotes(filteredNotes);
      document.getElementById('titleText').textContent = `Notes tagged: ${tag}`;

      tagsListContainer.style.display = 'none';
      allNotesContainer.style.display = 'flex';
    });

    const img = document.createElement('img');
    img.classList.add('src');
    img.setAttribute('src', './assets/images/icon-tag-darkMode.svg');

    const span = document.createElement('span');
    span.classList.add('tagListTitle');
    span.innerText = tag;

    li.appendChild(img);
    li.appendChild(span);
    tagsUl.appendChild(li);
  });

  tagsListContainer.appendChild(tagsUl);
  applyThemeToDynamicContent(currentColorTheme);
}
showNotesByTag();
