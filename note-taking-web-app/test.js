//Function to update UI
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
