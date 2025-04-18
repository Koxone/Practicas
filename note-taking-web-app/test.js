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
