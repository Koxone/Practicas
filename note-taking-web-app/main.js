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

//Function to goback to allNotesContainer
function resetUi() {
  const allNotesScreen = document.getElementById('allNotesContainer');
  const newNoteScreen = document.getElementById('newNoteContainer');
  const titleContainer = document.getElementById('titleContainer');
  const titleText = titleContainer.querySelector('.titleText');
  const openNotesContainer = document.getElementById('openNotesContainer');
  const allArchivedNotesContainer = document.getElementById('allArchivedNotesContainer');
  const subtitle = document.querySelector('.archivedNotesSubtitle');

  allNotesScreen.style.display = 'flex';
  titleContainer.style.display = 'flex';
  newNoteScreen.style.display = 'none';
  openNotesContainer.style.display = 'none';
  allArchivedNotesContainer.style.display = 'none';
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
          if (window.location.pathname.includes('settings.html')) {
            window.location.href = 'index.html?from=settings';
          }
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

//Function to show Archive Notes Screen
function settingsArchivedButtonHandler() {
  const allNotesContainer = document.getElementById('allNotesContainer');
  const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');
  const subtitle = document.querySelector('.archivedNotesSubtitle');
  const titleContainer = document.getElementById('titleContainer');

  if (allNotesContainer) {
    const titleText = document.getElementById('titleText');
    const spacers = document.querySelectorAll('.spacer');
    spacers.forEach((spacer) => {
      spacer.style.display = 'block';
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

//Function to load notes from wwith login
export function loadInitialState() {
  window.addEventListener('DOMContentLoaded', () => {
    const allNotesContainer = document.getElementById('allNotesContainer');
    const titleContainer = document.getElementById('titleContainer');
    const openNotes = document.querySelectorAll('.openNoteContainer');
    const archivedNotesScreen = document.querySelector('.archivedNotesContainer');
    const subtitle = document.querySelector('.archivedNotesSubtitle');
    const logoText = document.querySelector('.logoText');

    const elementsForLightMode = document.querySelectorAll(
      '.color, .src, footer, .footerButton, .border, .backImgModal, .fill, .backgroundM, .background, .imgContainer, img, .newNoteHeader, .stroke, body, .spacer, .generalContainer, .mainContainer, .mainHeader, .noteCard'
    );

    if (allNotesContainer) {
      allNotesContainer.style.display = 'flex'; //flex
      titleContainer.style.display = 'flex'; //flex
      titleContainer.style.flexDirection = 'unset'; //unset
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

    if (from === 'settings') {
      console.log('Prueba 8 FUNCIONA');
      settingsArchivedButtonHandler();
    }
  });
}
loadInitialState();

//Function to change Font And Color Theme
export function changeFontOrColorTheme() {
  const applyButton = document.getElementById('applyButton');
  const resetButton = document.getElementById('resetButton');
  const elements = document.querySelectorAll(
    'body, .backButtonText, .generalContainer, .imgContainer, .mainContainer, header, .spacer, li, .settingsButton'
  );

  let fontFamilyselection = currentFontFamily;
  let colorThemeSelection = currentColorTheme;

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
function updateUi() {
  const allNotesContainer = document.getElementById('allNotesContainer');
  const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');

  if (allNotesContainer) {
    allNotesContainer.innerHTML = '';

    currentUserNotes
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

//Function for Delete and Archive Button
function deleteAndArchiveNotes() {
  document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.deleteButton');
    const clickedArchiveButton = event.target.closest('.archiveButton');
    const clickedRestoreButton = event.target.closest('.restore');
    const modalImg = document.getElementById('modalImg');

    const modal = document.querySelector('.modal');
    const modalCancelButton = document.querySelector('.modalCancelButton');
    const modalRightButton = document.querySelector('.modalRightButton');
    const modalTextTop = document.querySelector('.modalTextTop');
    const modalTextBottom = document.querySelector('.modalTextBottom');

    const overlay = document.getElementById('overlay');

    //DELETE
    if (clickedButton && clickedButton.classList.contains('deleteButton')) {
      const targetNote = clickedButton.closest('[data-id]');
      if (targetNote) {
        let noteToDelete = targetNote.getAttribute('data-id');

        overlay.style.display = 'block';
        modal.style.display = 'flex';
        modalRightButton.classList.remove('modalArchiveButton');
        modalRightButton.classList.add('modalDeleteButton');
        modalRightButton.textContent = 'Delete Note';
        modalTextTop.textContent = 'Delete Note';
        modalTextBottom.textContent = 'Are you sure you want to permanently delete this note? This action cannot be undone.';

        modalRightButton.addEventListener('click', () => {

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
        });

        modalCancelButton.addEventListener('click', () => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
        });
      }
      //ARCHIVE
    } else if (clickedArchiveButton && clickedArchiveButton.classList.contains('archiveButton')) {
      const targetNote = clickedArchiveButton.closest('[data-id]');
      if (targetNote) {
        let noteToArchive = targetNote.getAttribute('data-id');

        overlay.style.display = 'block';
        modal.style.display = 'flex';
        modalRightButton.classList.remove('modalDeleteButton');
        modalRightButton.classList.add('modalArchiveButton');
        modalRightButton.textContent = 'Archive Note';
        modalTextTop.textContent = 'Archive Note';
        modalTextBottom.textContent =
          'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.';
        modalImg.setAttribute('src', './assets/images/icon-archive-lightMode.svg');

        modalRightButton.addEventListener('click', () => {
          let archivedNote = currentUserNotes.find((note) => {
            return note.id === noteToArchive;
          });

          let noteStatus = currentUserNotes.find((note) =>  note.id === noteToArchive);

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
        });

        modalCancelButton.addEventListener('click', () => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
        });
      }
      //RESTORE
    } else if (clickedRestoreButton && clickedRestoreButton.classList.contains('restore')) {
      const targetNote = clickedRestoreButton.closest('[data-id]');
      if (targetNote) {
        let noteToRestore = targetNote.getAttribute('data-id');

        overlay.style.display = 'block';
        modal.style.display = 'flex';
        modalRightButton.classList.remove('modalArchiveButton');
        modalRightButton.classList.remove('modalDeleteButton');
        modalRightButton.classList.add('modalRestoreButton');
        modalRightButton.textContent = 'Restore Note';
        modalTextTop.textContent = 'Restore Note';
        modalTextBottom.textContent = 'Are you sure you want to restore thi note to All Notes Section?';

        modalRightButton.addEventListener('click', () => {

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
        });

        modalCancelButton.addEventListener('click', () => {
          modal.style.display = 'none';
          overlay.style.display = 'none';
        });
      }
    }
  });
}
deleteAndArchiveNotes();

//Function to show Archive Notes Screen
function showArchivedNotesScreen() {
  document.addEventListener('click', (event) => {
    if (!event.target.closest('#archivedButton')) return;
    
    const closest = event.target.closest('#archivedButton');

    const newNoteButton = document.getElementById('newNoteButton');
    newNoteButton.style.display = 'none';

    if (closest) {
      const allNotesContainer = document.getElementById('allNotesContainer');
      const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');
      const subtitle = document.querySelector('.archivedNotesSubtitle');
      const titleContainer = document.getElementById('titleContainer');

      if (allNotesContainer) {
        const titleText = document.getElementById('titleText');
        const spacers = document.querySelectorAll('.spacer');
        spacers.forEach((spacer) => {
          spacer.style.display = 'block';
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
  });
}
editAndSaveNotes();


