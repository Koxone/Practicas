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
      
      const noteNumbers = currentUserNotes.map(note => {
        return parseInt(note.id.split('-')[1], 10);
      })
      
      const highestNumber = Math.max(...noteNumbers);
      let nextIdNumber = highestNumber + 1;

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

//Function edit and save existing notes
function editAndSaveNotes() {
  document.addEventListener('click', (event) => {
    let content = '';
    const noteCardClicked = event.target.closest('.noteCard');

    if (noteCardClicked) {
      const noteId = noteCardClicked.getAttribute('data-id');
      const textarea = document.querySelector(`textarea[data-id="${noteId}"]`);

      if (textarea) {
        textarea.addEventListener('input', (event) => {
          content = event.target.value;
          console.log('Prueba Input:', content);
        })
      }
    } else {
      console.log('Click inservible');
    }
  })
}
editAndSaveNotes()

//Function to update UI
function updateUi() {
  const allArchivedNotesContainer = document.querySelector('.allArchivedNotesContainer');

  if (allArchivedNotesContainer) {
    allArchivedNotesContainer.innerHTML = '';

    currentUserArchivedNotes.forEach((note) => {
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

//Function for Opening Notes
function openNotes(category) {
  const openNotesContainer = document.getElementById('openNotesContainer'); //Contenedor padre
  category = currentUserNotes || currentUserArchivedNotes;

  if (category === currentUserNotes) {
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
      applyThemeToDynamicContent(currentColorTheme);
    });
  } else if (category === currentUserArchivedNotes) {

    openNotesContainer.innerHTML = ''; //Vaciamos contenedor padre
    openNotesContainer.style.display = 'flex';

    currentUserArchivedNotes.forEach((note) => {
      const openNoteContainer = document.createElement('div'); //Contenedor Hijo, contiene header con botones, spacer y openNote
      openNoteContainer.classList.add('openNoteContainer');
      openNoteContainer.classList.add('openArchivedNoteContainer');
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
      openNoteArchiveButton.disabled = true;
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
      openNoteSaveButton.disabled = true;
      openNoteSaveButton.classList.add('saveButton');
      openNoteSaveButton.innerText = 'Save Note';

      const spacer = document.createElement('div');
      spacer.classList.add('spacer');

      const openNote = document.createElement('div'); //Contenedor con contenedores de titulo,
      openNote.classList.add('openNote');
      openNote.classList.add('openArchivedNote');

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
      applyThemeToDynamicContent(currentColorTheme);
    });
  }
}

