//Global Variables
let jsonData = [];

//Local Storage Variables


//Quick Test Section

// Function to load JSON only once if not in localStorage
function loadJsonData() {
    const storedJson = localStorage.getItem('jsonData');
    if (storedJson) {
        jsonData = JSON.parse(storedJson);
        console.log('✅ JSON cargado desde localStorage');
    } else {
        fetch('data.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                jsonData = data;
                localStorage.setItem('jsonData', JSON.stringify(data));
                console.log('✅ JSON cargado desde archivo y guardado en localStorage');
            })
            .catch(function(error) {
                console.error('Error al cargar JSON:', error);
            });
    }
}
loadJsonData();

//Function to get data from JSON
function getJsonData() {
    fetch('data.json')
    .then(function(response) {
        console.log('Data fetched from JSON')
        return response.json();
    })
    .then(function(data) {
        jsonData = data;
        localStorage.setItem('jsonData', JSON.stringify(data));
    })
    .catch(function(error) {
        console.log('Error found on getJsonData')
    })
}
getJsonData()

//Function to search into JSON File
function searchByTitle(titleToSearch) {
    if (!jsonData) {
        console.log('JSON Data Not Available')
        return null;
    }
    return jsonData.find((item) => {
        return item.title.toLowerCase() === titleToSearch.toLowerCase();
    });
}

//Function for Card Images
function updateTcardUi() {
    const tCards = document.querySelectorAll('.tCard');
    
    tCards.forEach(tCard => {
        let titleContainer = tCard.querySelector('.midText');
        let imageContainer = tCard.querySelector('.tCardImage')
        let tCardImage = tCard.firstElementChild;
        let titleText = titleContainer.textContent.trim().toLowerCase(); //Returns the title in lowercase

        let result = searchByTitle(titleText);

        if (result) { //Result returns the complete object with title, year, thumbnail, etc
            const tCardThumbnail = document.querySelectorAll('.tCardThumbnail');
            const tCardTitle = document.querySelectorAll('.tCardTitle');
            const tCardRate = document.querySelectorAll('.tCardRatetCardRate');
            const tCardCategoryIcon = document.querySelectorAll('.tCardCategoryIcon');

            

            console.log('Prueba Result Year:', result.year)
            console.log('Prueba Result Category:', result.category)
            console.log('Prueba Result Rating:', result.rating)
            console.log('Prueba Result isBookmarked?:', result.isBookmarked)
            console.log('Prueba Result isTrending?:', result.isTrending)
            console.log('Prueba Result Thumbnail:', result.thumbnail.trending.small)
        } else {
            console.log('No funciona', result)
        }
    });
}
updateTcardUi()

//Function to Update UI
function updateUi() {
    const tCards = document.querySelectorAll('.tCard');
    tCards.forEach(tCard => {
        const titleContainer = tCard.querySelector('.midText');
        let titleText = titleContainer.textContent.trim().toLowerCase(); //Returns the title in lowercase
        const tCardThumbnail = document.querySelectorAll('.tCardThumbnail');
        const tCardTitle = document.querySelectorAll('.tCardTitle');
        const tCardRate = document.querySelectorAll('.tCardRatetCardRate');
        const tCardCategoryIcon = document.querySelectorAll('.tCardCategoryIcon');

        let result = searchByTitle(titleContainer)

        console.log('tCard ID:', tCard.id)
        console.log('tCard Title:', tCardTitle.textContent)
    });
}

/*
const cards = document.querySelectorAll('.card');
            console.log('Prueba Title Text', titleText)
            console.log('Prueba Result', result)
            console.log('Prueba tCardImage', tCardImage.querySelector('img').src)
*/