//Global Variables
let jsonData = [];
let currentQuizTitle = '';
let currentQuizIcon = '';
let currentQuizQuestions = [];

//LocalStorage Variables
let topicSelectedLocalStorage = '';

//Funcion para obtener datos de JSON
function getJson() {
    fetch('data.json')
    .then(function(response) {
        console.log('Response Received', jsonData);
        return response.json();
    })
    .then(function(data) {
        jsonData = data;
        console.log('Data Obtained');
    })
    .catch(function(error) {
        console.log('Error Found');
    });
}
getJson()

//Function to get Title, Icon and Questions from JSON
function getQuizData(title) {
    const quizData = jsonData.quizzes.find(function(quiz) {
        return quiz.title.toLowerCase() === title.toLowerCase();
    });

    if (quizData) {
        currentQuizTitle = quizData.title;
        currentQuizIcon = quizData.icon;
        currentQuizQuestions = quizData.questions;

        console.log('Title:', currentQuizTitle);
        console.log('Icon:', currentQuizIcon);
        console.log('Questions:', currentQuizQuestions);
    }else {
        currentQuizTitle = '';
        currentQuizIcon = '';
        currentQuizQuestions = [];
        console.warn('Quiz Not Found:', title);
    }
}

//Function to choose Topic
function topicSelection() {
    const topics = document.querySelectorAll('.optionContainer');

    topics.forEach(function(topic) {
        topic.addEventListener('click', () => {
            const selectedTopic = topic.id;
            getQuizData(selectedTopic);
            localStorage.setItem('jsonData', JSON.stringify(jsonData));
            localStorage.setItem('topicSelected', selectedTopic)
            window.location.href = 'questionPage.html';
        })
    })
}
topicSelection()