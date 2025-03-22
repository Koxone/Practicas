//Variables Globales
let jsonData = [];

//Function to load data from JSON File
function getData() {
    fetch('data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        jsonData = data;
        updateCards('daily');
    })
    .catch(function(error) {
        console.log('Error loading JSON', error);
    });
}

//Function to Update Cards
function updateCards(period) {
    jsonData.forEach(function(item) {
        const title = item.title;
        const timeFrame = item.timeframes[period]; //period could be Daily, Weekly or Monthly

        //Convertir el title que contiene mayusculas y espacios a ID compatible con HTML
        const id = title.toLowerCase().replace(' ', ''); //This deletes the space in Self Care Card Title
        const card = document.getElementById(id + 'Card'); // The real title in the HTML is for example workCard

        if (card) {
            const timeElement = card.querySelector('.time');
            const totalElement = card.querySelector('.totalTime');
            const labelElement = card.querySelector('.lastPeriod span');

            let labelText = '';
            if (period === 'daily') labelText = 'Day';
            if (period === 'weekly') labelText = 'Week';
            if (period === 'monthly') labelText = 'Month';

            timeElement.textContent = timeFrame.current + 'hrs';
            totalElement.textContent = timeFrame.previous + ' hrs';
            labelElement.textContent = labelText;
        }
    })
}

//Function to choose between Daily, Weekly and Monthly
function chooseButton() {
    const chooseButtons = document.querySelectorAll('#daily, #weekly, #monthly');
    chooseButtons.forEach(function(button) {
        button.addEventListener('click', () => {
            const id = button.id;
            updateCards(id);
        })
    })
}
chooseButton()
getData()

