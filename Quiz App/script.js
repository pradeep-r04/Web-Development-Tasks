const questions = [
    {
        question: "What is the world's longest river?",
        answers: [
            { text:"Amazon", correct: false},
            { text:"Nile", correct: true},
            { text:"Mississippi", correct: false},
            { text:"Yangtze", correct: false},
        ]
    },
    {
        question:"Which country is known as the Land of the Rising Sun?",
        answers: [
            { text:"China", correct: false},
            { text:"South Korea", correct: false},
            { text:"India", correct: false},
            { text:"Japan", correct: true},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers: [
            { text:"Mars", correct: true},
            { text:"Earth", correct: false},
            { text:"Venus", correct: false},
            { text:"Jupiter", correct: false},
        ]
    },
    {
        question:"What is the largest mammal in the world?",
        answers: [
            { text:"Elephant", correct: false},
            { text:"Blue Whale", correct: true},
            { text:"Giraffe", correct: false},
            { text:"Polar Bear", correct: false},
        ]
    },
    {
        question:"What is the currency of Switzerland?",
        answers: [
            { text:"Euro", correct: false},
            { text:"Swiss Franc", correct: true},
            { text:"Krona", correct: false},
            { text:"Pound Sterling", correct: false},
        ]
    },
    {
        question:"What is the largest desert in the world?",
        answers: [
            { text:"Sahara Desert", correct: false},
            { text:"Gobi Desert", correct: false},
            { text:"Antarctic Desert", correct: true},
            { text:"Arctic Desert", correct: false},
        ]
    },
    {
        question:"What is the capital city of Bhutan?",
        answers: [
            { text:"Thimphu", correct: true},
            { text:"Kathmandu", correct: false},
            { text:"Ulaanbaatar", correct: false},
            { text:"Vientiane", correct: false},
        ]
    },
    {
        question:"Which Indian state is known as the Land of Five Rivers?",
        answers: [
            { text:"Rajasthan", correct: false},
            { text:"Uttrakhand", correct: false},
            { text:"Uttar Pradesh", correct: false},
            { text:"Punjab", correct: true},
        ]
    },
    {
        question:"Who is known as the Father of the Indian Space Program for his role in establishing the Indian Space Research Organisation (ISRO)?",
        answers: [
            { text:"C.V. Raman", correct: false},
            { text:"Vikram Sarabhai", correct: true},
            { text:"Homi Bhabha", correct: false},
            { text:"A.P.J. Abdul Kalam", correct: false},
        ]
    },
    {
        question:"Which Indian state is known as the Spice Garden of India for its extensive spice cultivation?",
        answers: [
            { text:"Uttrakhand", correct: false},
            { text:"Maharastra", correct: false},
            { text:"Kerala", correct: true},
            { text:"Gujarat", correct: false},
        ]
    },
    {
        question:"In which year was the Indian Space Research Organisation (ISRO) founded?",
        answers: [
            { text:"1969", correct: true},
            { text:"1999", correct: false},
            { text:"1982", correct: false},
            { text:"1991", correct: false},
        ]
    },
    {
        question:"The Konark Sun Temple, a UNESCO World Heritage Site, is located in which Indian state?",
        answers: [
            { text:"Gujarat", correct: false},
            { text:"Tamilnadu", correct: false},
            { text:"Rajasthan", correct: false},
            { text:"Odisha", correct: true},
        ]
    },
    {
        question:"The Indian national motto, 'Satyameva Jayate' is taken from which ancient Indian scripture?",
        answers: [
            { text:"Bhagwat Geeta", correct: false},
            { text:"Upanishads", correct: false},
            { text:"Rigveda", correct: true},
            { text:"Mundaka Upanishad", correct: false},
        ]
    },
    {
        question:"The ancient university of Nalanda, a UNESCO World Heritage Site, was located in which present-day Indian state?",
        answers: [
            { text:"Jharkhand", correct: false},
            { text:"Bihar", correct: true},
            { text:"Madhya Pradesh", correct: false},
            { text:"West Bengal", correct: false},
        ]
    },
    {
        question:"Who was the first Indian woman to climb Mount Everest?",
        answers: [
            { text:"Arati Saha", correct: false},
            { text:"Santosh Yadav", correct: false},
            { text:"Bachendri Pal", correct: true},
            { text:"Premlata Agarwal", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(questions);

startQuiz();