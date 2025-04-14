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