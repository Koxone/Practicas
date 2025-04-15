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

    //DELETE
    if (clickedButton && clickedButton.classList.contains('deleteButton')) {
      const targetNote = clickedButton.closest('[data-id]');
      if (targetNote) {
        let noteToDelete = targetNote.getAttribute('data-id');

        modal.style.display = 'flex';
        modalRightButton.classList.add('modalDeleteButton');

        modalRightButton.addEventListener('click', () => {
          currentUserNotes = currentUserNotes.filter((note) => note.id !== noteToDelete);
          currentUserArchivedNotes = currentUserArchivedNotes.filter((note) => note.id !== noteToDelete);
          localStorage.setItem('currentUserNotes', JSON.stringify(currentUserNotes));
          localStorage.setItem('currentUserArchivedNotes', JSON.stringify(currentUserArchivedNotes));
          console.log('Nota Eliminada:', noteToDelete);
          window.location.href = 'index.html';
          modal.style.display = 'none';
          modalRightButton.classList.remove('modalDeleteButton');
          updateUi();
        });

        modalCancelButton.addEventListener('click', () => {
          modal.style.display = 'none'
        });
      }
      //ARCHIVE
    } else if (clickedArchiveButton && clickedArchiveButton.classList.contains('archiveButton')) {
      const targetNote = clickedArchiveButton.closest('[data-id]');
      if (targetNote) {
        let noteToArchive = targetNote.getAttribute('data-id');

        modal.style.display = 'flex';
        modalRightButton.classList.add('modalArchiveButton');
        modalRightButton.textContent = 'Archive Note';
        modalTextTop.textContent = 'Archive Note';
        modalTextBottom.textContent = 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.';
        modalImg.setAttribute('src', './assets/images/icon-archive-lightMode.svg');

        modalRightButton.addEventListener('click', () => {
          let archivedNote = currentUserNotes.find((note) => {
            return note.id === noteToArchive;
          });

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
          modal.style.display = 'none'
        });
      }
      //RESTORE
    } else if (clickedRestoreButton && clickedRestoreButton.classList.contains('restore')) { 
      const targetNote = clickedRestoreButton.closest('[data-id]');
      if (targetNote) {
        let noteToRestore = targetNote.getAttribute('data-id');

        let userConfirmation = confirm('Are you sure you want to restore thi note to All Notes Section?');
        if (userConfirmation) {
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
        }
      }
    }
  });
}
deleteAndArchiveNotes();