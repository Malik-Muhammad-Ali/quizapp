const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answer-indicators");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const questions = document.getElementById("questions");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let noOfQuestions = 5;

questions.innerHTML = noOfQuestions;

// Set The Questions
const setAvailableQuestions = ()=>{
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i]);
    }
}

// Change New Questions
const getNewQuestion = ()=>{
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${noOfQuestions}`;

    // Getting Random Questions
    const questionIndex = availableQuestions[Math.floor(Math.random() * noOfQuestions)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // Remove questions from array
    const index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);

    const optionLen = currentQuestion.options.length;
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML = "";
    let animationDelay = 0.15;
    // Creating HTML element
    for(let i=0; i<optionLen; i++){
        // Removing options from array
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);

        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay+'s';
        animationDelay = animationDelay+0.15;
        option.className = "option";
        optionContainer.appendChild(option);

        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++;
}

const getResult = (element)=>{
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        element.classList.add("correct");
        updateAnswerIndicator("correct1");
        correctAnswers++;
    }else{
        element.classList.add("wrong");
        updateAnswerIndicator("wrong1");
    }

    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
            optionContainer.children[i].classList.add("correct");
        }
    }

    attempt++;
    unclickableOptions();
}

// Make Answers Unclickable
const unclickableOptions = ()=>{
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

// Create Indicators
const answerIndicator = ()=>{
    // const totalQuestion = quiz.length;
    answersIndicatorContainer.innerHTML = "";
    for(let i=0; i<noOfQuestions; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

// Update Indicators
const updateAnswerIndicator = (marktype)=>{
    answersIndicatorContainer.children[questionCounter-1].classList.add(marktype);
}

const next = ()=>{
    questionCounter === noOfQuestions ? quizOver() : getNewQuestion();
}

// Quiz Over Function
const quizOver = ()=>{
    second.classList.add("display");
    third.classList.remove("display");
    quizResult();
}

// Showing Quiz Result
const quizResult = ()=>{
    third.querySelector(".total-question").innerHTML = noOfQuestions;
    third.querySelector(".total-attempt").innerHTML = attempt;
    third.querySelector(".total-correct").innerHTML = correctAnswers;
    third.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/noOfQuestions) * 100;
    third.querySelector(".Percentage").innerHTML = `${percentage.toFixed(2)}%`;     
    third.querySelector(".total-score").innerHTML = `${correctAnswers}/${noOfQuestions}`;
}

// Reset the quiz
const resetQuiz = ()=>{
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    third.classList.add("display");
    first.classList.remove("display");
}

const startQuiz = ()=>{
    first.classList.add("display");
    second.classList.remove("display");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator();
}