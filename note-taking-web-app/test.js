//Function to show Archive Notes Screen
function prueba8() {
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
prueba8();
