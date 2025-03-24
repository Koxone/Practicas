//Global Variables
let jsonData = null;
let currentQuestionIndex = 0;
let userChoice = '';
let currentChoiceText = ''; 
let currentRightOption = null;
let score = null;

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

// //Guidance to search in JSON
// console.log(jsonData.quizzes[0].title); 
// console.log(jsonData.quizzes[0].questions[0].question); 
// console.log(jsonData.quizzes[0].questions[0].options[0]); 
// console.log(jsonData.quizzes[0].questions[0].answer); 

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
        const letterContainer = label.querySelector('.letterContainer');
        const optionText = label.querySelector('.questionText2').textContent.trim();

        if (optionText === answer) {
            currentRightOption = input.value;
            input.classList.add('correct');
            letterContainer.classList.add('correct');
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
                    input.classList.add('correct')
                    let label = input.nextElementSibling;
                    let letter = label.querySelector('.letterContainer');
                    input.classList.add('error');
                    label.style.border = '2px solid #008000';
                    letter.style.backgroundColor = '#008000';
                }
            })
            console.log('Right Answer! ✅')
            error = false
            score++;
            console.log('Score:', score)
        } else {
            let inputs = document.querySelectorAll('.inputRadio');
            inputs.forEach(function(input) {
                if(input.value === userChoice) {
                    let label = input.nextElementSibling;
                    let letter = label.querySelector('.letterContainer');
                    input.classList.add('error');
                    label.style.border = '2px solid #FF0000';
                    letter.style.backgroundColor = '#FF0000';
                }
            })
            rightAnswer()
            console.log('Wrong Answer ❌')
            error = true
        }
    })
}
submitAnswer()



