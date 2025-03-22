//Global Variables

//Local Storage Variables
let currentTopic = localStorage.getItem('topicSelected');
let jsonData = JSON.parse(localStorage.getItem('jsonData'));
console.log('Topic:', currentTopic)

//Function to update UI depending on Current Topic
function updateUi() {
    const topicImg = document.querySelector('.quizIcon');
    const topicTitle = document.querySelector('.questionTitleText');
    const questionText = document.querySelector('.questionText');

    if (currentTopic === 'css') {
        let currentQuiz = jsonData.quizzes.find(function(quiz) {
            return quiz.title.toLowerCase() === currentTopic.toLocaleLowerCase();
        });

        if (currentQuiz) {
            topicImg.src = currentQuiz.icon;
            topicTitle.textContent = currentQuiz.title;
            questionText.textContent = currentQuiz.questions[0].question;
        }
    }
}
updateUi()

