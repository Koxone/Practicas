import { currentUser } from './main';

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
      const backButton = document.querySelector('.backButton');
      backButton.style.display = 'flex';
      document.querySelectorAll('.tagElement').forEach((tagEl) => {
        tagEl.classList.remove('activeTag');
      });

      li.classList.add('activeTag');

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
}
showNotesByTag();

//Function to handle New Note Header Buttons
function backAndCancelButtonHandler() {
  const archivedNotesContainer = document.getElementById('allArchivedNotesContainer');
  const allNotesContainer = document.getElementById('allNotesContainer');
  const openNotesContainer = document.getElementById('openNotesContainer');
  const newNoteContainer = document.getElementById('newNoteContainer');
  const titleContainer = document.getElementById('titleContainer');
  const tagsListContainer = document.querySelector('.tagsListContainer');

  document.addEventListener('click', (event) => {
    const backOrCancel = event.target.closest('.backButton, .cancelButton, .goBackToTags');

    if (!backOrCancel) return;

    titleContainer.style.display = 'flex';
    const container = event.target.closest('.openArchivedNoteContainer, .openNoteContainer, .newNoteContainer, .tagsListContainer');

    switch (true) {
      case container?.classList.contains('openArchivedNoteContainer'):
        archivedNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        tagsListContainer.style.display = 'none';
        break;

      case container?.classList.contains('openNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        tagsListContainer.style.display = 'none';
        break;

      case container?.classList.contains('newNoteContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        newNoteContainer.style.display = 'none';
        tagsListContainer.style.display = 'none';
        break;

      case container?.classList.contains('tagsListContainer'):
        allNotesContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        newNoteContainer.style.display = 'none';
        tagsListContainer.style.display = 'none';
        break;

      default:
        console.log('noteMenuButtonsHandler is not working');
    }
  });
}
backAndCancelButtonHandler();

//Function to show Footer Buttons Screens
function showFooterMenuScreens() {
  document.addEventListener('click', (event) => {
    if (!(event.target.closest('#searchButton') 
      || event.target.closest('#tagsButton') 
      || event.target.closest('#archivedButton') 
      || event.target.closest('#goBackToTags'))) return;

    const titleText = document.getElementById('titleText');
    const clickedButton = event.target.closest('.footerButton') || event.target.closest('#goBackToTags');

    const elementsToHideSearch = document.querySelectorAll(
      '.tagsListContainer, #allArchivedNotesContainer, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );
    const elementsToShowSearch = document.querySelectorAll('.subtitleSearch, #titleContainer, #allNotesContainer, .searchEngineContainer');
    
    const elementsToShowTags = document.querySelectorAll('.tagsListContainer, #titleContainer');
    const elementsToHideTags = document.querySelectorAll(
      '#allNotesContainer, #searchEngineContainer, #allArchivedNotesContainer, #goBackToTags, #newNoteButton, .archivedNotesSubtitle, #newNoteContainer'
    );
    
    const elementsToShowArchive = document.querySelectorAll('.allArchivedNotesContainer, .spacer, .archivedNotesSubtitle, #titleContainer, .spacer');
    const elementsToHideArchive = document.querySelectorAll(
      '#searchEngineContainer, #subtitleSearch, #newNoteContainer, #allNotesContainer, #newNoteButton, .tagsListContainer'
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
        console.log('Funciona Archived Kox')
        elementsToShowArchive.forEach((element) => {
          element.style.display = 'flex';
        })
        elementsToHideArchive.forEach((element) => {
          element.style.display = 'none';
        });
        titleText.textContent = 'Archived Notes'
        break;

      default:
        console.log('Error en showFooterMenuScreens');
    }
  });
}
showFooterMenuScreens();