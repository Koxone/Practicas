//Global Variables
let jsonData = []

//Local Storage Variables

//Quick Test Section

// Function to load JSON only once if not in localStorage
function loadJsonData() {
  const storedJson = localStorage.getItem('jsonData')
  if (storedJson) {
    jsonData = JSON.parse(storedJson)
    console.log('✅ JSON cargado desde localStorage')
  } else {
    fetch('data.json')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        jsonData = data
        localStorage.setItem('jsonData', JSON.stringify(data))
        console.log('✅ JSON cargado desde archivo y guardado en localStorage')
      })
      .catch(function (error) {
        console.error('Error al cargar JSON:', error)
      })
  }
}
loadJsonData()

//Function to get data from JSON
function getJsonData() {
  fetch('data.json')
    .then(function (response) {
      console.log('Data fetched from JSON')
      return response.json()
    })
    .then(function (data) {
      jsonData = data
      localStorage.setItem('jsonData', JSON.stringify(data))
    })
    .catch(function (error) {
      console.log('Error found on getJsonData')
    })
}
getJsonData()

//Function to search into JSON File
function searchByTitle(titleToSearch) {
  if (!jsonData) {
    console.log('JSON Data Not Available')
    return null
  }
  return jsonData.find((item) => {
    return item.title.toLowerCase() === titleToSearch.toLowerCase()
  })
}

//Function for Card Images
function updateUi() {
  const tCards = document.querySelectorAll('.tCard')
  const cards = document.querySelectorAll('.card')

  tCards.forEach(function (tCard, index) {
    const data = jsonData[index]
    if (!data) return

    //Main Image
    const thumbnail = tCard.querySelector('.tCardThumbnail')
    if (data.thumbnail?.trending?.small) {
      thumbnail.setAttribute('src', data.thumbnail.trending.small)
      thumbnail.setAttribute('alt', data.title)
    }

    //Bookmark
    const bookmark = tCard.querySelector('.bookmarkTcard')
    if (bookmark) {
      const iconPath =
        data.isBookmarked === true
          ? './assets/icon-bookmark-full.svg'
          : './assets/icon-bookmark-empty.svg'
      bookmark.setAttribute('src', iconPath)
      bookmark.setAttribute('alt', data.isBookmarked)
    }

    //Year
    let tCardYear = tCard.querySelector('.tCardYear')
    tCardYear.textContent = data.year

    //Category Icon
    let tCardCategoryIcon = tCard.querySelector('.tCardCategoryIcon')
    if (tCardCategoryIcon) {
      const isMovie = data.category === 'Movie'
      const iconPath = isMovie
        ? './assets/icon-nav-movies.svg'
        : './assets/icon-nav-tv-series.svg'
      tCardCategoryIcon.setAttribute('src', iconPath)
      tCardCategoryIcon.setAttribute('alt', data.category)
    }

    //Category Text
    let tCardCategory = tCard.querySelector('.tCardCategory')
    tCardCategory.textContent = data.category

    //Title Text
    let tCardTitle = tCard.querySelector('.tCardTitle')
    tCardTitle.textContent = data.title

    //Rate Text
    let tCardRate = tCard.querySelector('.tCardRate')
    tCardRate.textContent = data.rating
  })

  cards.forEach(function (card, index) {
    const data = jsonData[index]
    if (!data) return

    //Main Image
    const thumbnail = card.querySelector('.cardThumbnail')
    if (data.thumbnail?.regular?.small) {
      thumbnail.setAttribute('src', data.thumbnail.regular.small)
      thumbnail.setAttribute('alt', data.title)
    }

    //Bookmark
    const bookmark = card.querySelector('.cardBookmark')
    const isBookmarked = data.isBookmarked === true
    if (bookmark) {
      const iconPath = isBookmarked
        ? './assets/icon-bookmark-full.svg'
        : './assets/icon-bookmark-empty.svg'
      bookmark.setAttribute('src', iconPath)
      bookmark.setAttribute('alt', data.isBookmarked)
      card.classList.remove('booked', 'notBooked')
      card.classList.add(isBookmarked ? 'booked' : 'notBooked')
    }

    //Year
    let cardYear = card.querySelector('.cardYear')
    cardYear.textContent = data.year

    //Category Icon
    let cardCategoryIcon = card.querySelector('.cardCategoryIcon')
    const isMovie = data.category === 'Movie'
    if (cardCategoryIcon) {
      const iconPath = isMovie
        ? './assets/icon-nav-movies.svg'
        : './assets/icon-nav-tv-series.svg'
      cardCategoryIcon.setAttribute('src', iconPath)
      cardCategoryIcon.setAttribute('alt', data.category)
      card.classList.remove('movie', 'tv')
      card.classList.add(isMovie ? 'movie' : 'tv')
    }

    //Category Text
    let cardCategory = card.querySelector('.cardCategory')
    cardCategory.textContent = data.category

    //Title Text
    let cardTitle = card.querySelector('.cardTitle')
    cardTitle.textContent = data.title

    //Rate Text
    let cardRate = card.querySelector('.cardRate')
    cardRate.textContent = data.rating
  })
}
updateUi()

//Function to handle filters
function filterMenu() {
  const menuButtons = document.querySelectorAll('.menuButton')
  const allCards = document.querySelectorAll('.movie, .tv')

  menuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id === 'tv') {
        allCards.forEach((card) => {
          if (card.classList.contains('movie')) {
            card.style.display = 'none'
          } else if (card.classList.contains('tv')) {
            card.style.display = 'flex'
          }
        })
      } else if (button.id === 'movie') {
        allCards.forEach((card) => {
          if (card.classList.contains('tv')) {
            card.style.display = 'none'
          } else if (card.classList.contains('movie')) {
            card.style.display = 'flex'
          }
        })
      } else if (button.id === 'home') {
        allCards.forEach((card) => {
          card.style.display = 'flex'
        })
      } else if (button.id === 'bookmarked') {
        allCards.forEach((card) => {
          if (card.classList.contains('notBooked')) {
            card.style.display = 'none'
          } else if (card.classList.contains('booked')) {
            card.style.display = 'flex'
          }
        })
      }
    })
  })
}
filterMenu()


// filterMenu()(() => {
//   const f = {
//     tv: (c) => c.classList.contains('tv'),
//     movie: (c) => c.classList.contains('movie'),
//     home: () => true,
//     bookmarked: (c) => c.classList.contains('booked'),
//   }
//   document
//     .querySelectorAll('.menuButton')
//     .forEach((b) =>
//       b.addEventListener('click', () =>
//         document
//           .querySelectorAll('.movie, .tv')
//           .forEach(
//             (c) => (c.style.display = (f[b.id] || f.home)(c) ? 'flex' : 'none')
//           )
//       )
//     )
// })()
