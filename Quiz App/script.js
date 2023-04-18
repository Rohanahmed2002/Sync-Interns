const questions = [
    {
        question: "What is 15 x 12?",
        answers: [
            {text: "165", correct: false},
            {text: "175", correct: false},
            {text: "180", correct: true},
            {text: "190", correct: false},
               
        ]
    },

    {
        question: "If we divide the diameter of a circle by 2, we get its: ",
        answers: [
            {text: "radius", correct: true},
            {text: "arc", correct: false},
            {text: "circumference", correct: false},
            {text: "area", correct: false},
               
        ]
    },

    {
        question: "Square root of 144 is: ",
        answers: [
            {text: "11", correct: false},
            {text: "12", correct: true},
            {text: "14", correct: false},
            {text: "16", correct: false},
               
        ]
    },

    {
        question: "360 degrees is equivalent to _________ radians: ",
        answers: [
            {text: "1", correct: false},
            {text: "2", correct: false},
            {text: "pi", correct: false},
            {text: "2 * pi", correct: true},
               
        ] 
    },

    {
        question: "I bought a car for $500 and sold it at a profit of 25%. How much did I sell the car for?",
        answers: [
            {text: "$600", correct: false},
            {text: "$625", correct: true},
            {text: "$650", correct: false},
            {text: "$700", correct: false},
               
        ] 
    }
];

const questionList = document.getElementById("questions")
const optionList = document.getElementById("options")
const nextButton = document.getElementById("next-btn")
const gif1 = document.getElementsByClassName('gif1');
const gif2 = document.getElementsByClassName('gif2');
const gif3 = document.getElementsByClassName('gif3');
const gifs = document.getElementsByClassName("gifs");

let questionIndex = 0;
let score = 0;

function mainscreen() {
    resetQuestion();
    questionList.innerHTML = "Press Start to begin the quiz!";
    questionList.classList.add("welcome-line")
    const beginquiz = document.createElement("button");
    beginquiz.innerHTML = "Start";
    beginquiz.classList.add("begin-button");
    questionList.appendChild(beginquiz);
  
    beginquiz.addEventListener("click", () => {
      quizStart();
      questionList.removeChild(beginquiz);
    });
  }
  

function quizStart(){
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetQuestion();
    let currentQuestion = questions[questionIndex];
    let questionNo = questionIndex + 1;
    questionList.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        optionList.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer)
    })
}

function chooseAnswer(e){
    const choice = e.target;
    const choiceCorrect = choice.dataset.correct === "true";
    if(choiceCorrect){
        choice.classList.add("correct");
        score++;
    }
    else{
        choice.classList.add("wrong");
    }

    Array.from(optionList.children).forEach(button =>{
        if(button.dataset.choice === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

function finalScore() {
    resetQuestion();
    let gif;
    if (score <= 2) {
        questionList.innerHTML = ` Your score: ${score}/${questions.length} 🙁`;
        gif = '<img src = "https://media.giphy.com/media/l49JZa00JZm8UAHAY/giphy.gif" alt=gif1>';
    } else if (score === 3) {
        questionList.innerHTML = ` Your score: ${score}/${questions.length} 👍`;
        gif = '<img src="https://media.giphy.com/media/26xBKqeFFspRZjDTW/giphy.gif" alt="gif2">';
    } else if (score === 4 || score === 5) {
        questionList.innerHTML = `Great Job! 😃, your score: ${score}/${questions.length}`
        gif = '<img src="https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif" alt="gif3">';
    }
    
    const gifContainer = document.createElement('div');
    gifContainer.innerHTML = gif;
    gifContainer.classList.add('giflist')
    questionList.appendChild(gifContainer);
    
    const playAgainButton = document.createElement('button');
    playAgainButton.innerHTML = 'Play Again';
    playAgainButton.classList.add('playagain');
    questionList.appendChild(playAgainButton);
    
    playAgainButton.addEventListener('click', mainscreen);

}


function nextQuestion(){
    questionIndex++;
    if(questionIndex<questions.length){
        showQuestion();
    }
    else{
        finalScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(questionIndex < questions.length){
        nextQuestion();
    }
    else{
        quizStart();
    }
})


function resetQuestion(){
    nextButton.style.display = "none";
    while(optionList.firstChild){
        optionList.removeChild(optionList.firstChild);
    }
}

mainscreen();
