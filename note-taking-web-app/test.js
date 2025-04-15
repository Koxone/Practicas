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
        newNoteContainer.style.display = 'flex';
        openNotesContainer.style.display = 'none';
        break;

      default:
        console.log('noteMenuButtonsHandler is not working');
    }
  });
}
backAndCancelButtonHandler();