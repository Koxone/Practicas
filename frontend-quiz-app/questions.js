//Global Variables
let jsonData = null;
let currentQuestionIndex = 0;
let userChoice = '';
let currentChoiceText = ''; 
let currentRightOption = null;
let score = null || 0;

//Error Variables
let error = undefined;

//Local Storage Variables
const currentTopic = localStorage.getItem('topicSelected');
let userAnswers = JSON.parse(localStorage.getItem('answers'));

//Quick Test Section
console.log('Current Topic', currentTopic);
console.log('User Answers', userAnswers);

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

//Function to clean UI
function cleanUI() {
    const inputs = document.querySelectorAll('input');
    const labels = document.querySelectorAll('label')
    const correctImg = document.querySelectorAll('.correctImg');
    const errorImg = document.querySelectorAll('.errorImg');
    const radios = document.querySelectorAll('.inputRadio');
    const submitButton = document.getElementById('submitButton');
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    const lettercontainer = document.querySelectorAll('.letterContainer');

    inputs.forEach(function(input) {
        input.removeAttribute('style');
        input.classList.remove('correct');
        input.classList.remove('error');
    })
    labels.forEach(function(label) {
        label.removeAttribute('style');
        label.classList.remove('correct');
        label.classList.remove('error');
    })
    correctImg.forEach(function(c) {
        c.removeAttribute('style');
    })
    errorImg.forEach(function(error) {
        error.removeAttribute('style');
    })
    radios.forEach(function(radio) {
        radio.removeAttribute('style');
        radio.checked = false;
    })
    lettercontainer.forEach(function(letter) {
        letter.removeAttribute('style');
        letter.classList.remove('correct');
        letter.classList.remove('error');
        letter.classList.remove('active');
    })
    nextQuestionButton.style.display = 'none';
    submitButton.style.display = 'block';
}

//Function to Update UI
function updateUi() {
    const topicImg = document.querySelector('.quizIcon');
    const topicTitle = document.querySelector('.questionTitleText');
    const questionText = document.querySelector('.questionText');
    const optionsText = document.querySelectorAll('.questionText2');

    if (currentTopic) {
        let currentQuiz = jsonData.quizzes.find(function(quiz) {
            return quiz.title.toLowerCase() === currentTopic.toLocaleLowerCase();
        });

        //Update Icon, Title and Question
        if (currentQuiz) {
            topicImg.src = currentQuiz.icon;
            topicTitle.textContent = currentQuiz.title;
            questionText.textContent = currentQuiz.questions[`${currentQuestionIndex}`].question;

            //Update Options
            currentQuiz.questions[`${currentQuestionIndex}`].options.forEach(function(optionText, index) {
                if (optionsText[index]) {
                    optionsText[index].textContent = optionText;
                }
            });

            //Update Question Number
            const questionNumber = document.getElementById('questionNumber');
            questionNumber.textContent = `Question ${currentQuestionIndex + 1} of 10`
        }
    }
}
updateUi()

//Function to detect correct option
function rightAnswer() {
    let currentQuiz = jsonData.quizzes.find(function(quiz) {
        return quiz.title.toLowerCase() === currentTopic.toLocaleLowerCase();
    });
    let currentQuestion = currentQuiz.questions[currentQuestionIndex];
    let answer = currentQuestion.answer;
    const radioInputs = document.querySelectorAll('.inputRadio');
    
    radioInputs.forEach(input => {
        const inputId = input.id;
        const label = document.querySelector(`label[for='${inputId}']`);
        const correctImg = label.querySelector('.correctImg');
        const letterContainer = label.querySelector('.letterContainer');
        const optionText = label.querySelector('.questionText2').textContent.trim();

        if (optionText === answer) {
            currentRightOption = input.value;
            input.classList.add('correct');
            letterContainer.classList.add('correct');
            correctImg.style.opacity = '1';

            console.log('Prueba right Answer:', input.value);
            console.log('UserChoice Kox:', userChoice)
            console.log('currentRightOption Kox:', currentRightOption)
        }
    });
}

//Function to update Options UI and save selection to Local Storage
function optionSelection() {
    const radioInputs = document.querySelectorAll('.inputRadio');
    const submitButton = document.getElementById('submitButton');

    radioInputs.forEach(function(input) {
        input.addEventListener('change', () => {
            console.log('User Answers', userAnswers);
            const inputId = input.id;
            const selectedValue = input.value;
            const allLetters = document.querySelectorAll('.letterContainer');

            allLetters.forEach((letter) => {
                letter.classList.remove('active');
            });

            const label = document.querySelector(`label[for='${inputId}']`);
            const letterContainer = label.querySelector('.letterContainer');
            let currentQuiz = jsonData.quizzes.find(function(quiz) {
                return quiz.title.toLowerCase() === currentTopic.toLocaleLowerCase();
            });

            letterContainer.classList.add('active');
            submitButton.style.backgroundColor = '#9b3aff';
            submitButton.style.border = '#9b3aff';
            submitButton.disabled = false;
            userChoice = selectedValue;
            currentChoiceText = currentQuiz.questions[currentQuestionIndex].options[Number(selectedValue)];//Texto dentro de cada option
        })
    })
}
optionSelection()

//Function update Final Score
function updateFinalScore() {
    const scoreNumber = document.querySelector('.scoreNumber');

    scoreNumber.textContent = score;
}

//Function to turn Submit Button into Next Question Button
function nextQuestionButton() {
    const submitButton = document.getElementById('submitButton');
    const nextQuestionButton = document.getElementById('nextQuestionButton');

    submitButton.style.display = 'none'
    nextQuestionButton.style.display = 'block';
    nextQuestionButton.addEventListener('click', () => {

        if (currentQuestionIndex < 10) {
            cleanUI()
            updateUi()
        } else {
            updateFinalScore()
            showScoreScreen()
        }
    })
}

//Function to show Score Screen after 10 Questions
function showScoreScreen() {
    const scoreScreen = document.querySelector('.scoreContainer');
    const questionScreen = document.querySelector('.mainQuestionContainer');

    questionScreen.style.display = 'none';
    scoreScreen.style.display = 'flex';
}

//Function for Submit Button, verify correct answer 
function submitAnswer() {
    const submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', () => {
        let currentQuiz = jsonData.quizzes.find(function(quiz) {
            return quiz.title.toLowerCase() === currentTopic.toLocaleLowerCase();
        });
        let currentQuestion = currentQuiz.questions[currentQuestionIndex];
        let correctAnswer = currentQuestion.answer;

        if (correctAnswer === currentChoiceText) {

            let inputs = document.querySelectorAll('.inputRadio');

            inputs.forEach(function(input) {

                if(input.value === userChoice) {
                    let label = input.nextElementSibling;
                    let letter = label.querySelector('.letterContainer');
                    const correctImg = label.querySelector('.correctImg');

                    input.classList.add('correct');
                    label.style.border = '2px solid #008000';
                    letter.style.backgroundColor = '#008000';
                    correctImg.style.opacity = '1';
                }
            })
            score++;
            localStorage.setItem('currentScore', JSON.stringify(score));
            console.log('Score Saved in Local Storage', score);
            console.log('Right Answer! ✅')
        } else {

            let inputs = document.querySelectorAll('.inputRadio');

            inputs.forEach(function(input) {
                if(input.value === userChoice) {

                    const label = input.nextElementSibling;
                    const letter = label.querySelector('.letterContainer');
                    const erroriMg = label.querySelector('.errorImg');
                    input.classList.add('error');
                    label.style.border = '2px solid #FF0000';
                    letter.style.backgroundColor = '#FF0000';
                    erroriMg.style.opacity = '1';
                }
            })
            rightAnswer()
            console.log('Wrong Answer ❌')
            console.log('Current Score:', score);
        }
        currentQuestionIndex++;
        nextQuestionButton()
    })
}
submitAnswer()

//Function for Play Again Button
function playAgainButton() {
    const playAgainButton = document.getElementById('playAgainButton');

    playAgainButton.addEventListener('click', () => {
        cleanUI()
        localStorage.clear()
        window.location.href = 'index.html'
    })
}
playAgainButton()







