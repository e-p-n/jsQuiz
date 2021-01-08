var questionNumber = 0;
var score = 75;
var correctAnswer = "";
var timerEl = document.querySelector('#timer');
var introEl = document.querySelector('#intro');
var questionAreaEl = document.querySelector('section');
var questionEl = document.querySelector('section h1');
var answerEl = document.querySelector('section div');
var startButtonEl = document.querySelector('section button');
var highScore = []
var timerCountdown;
var noOfCorrectAnswers = 0;
var answerStatus = null;
var endQuizMessage = "All done!";

var theQuiz = [
    {
        Q: "Commonly used data types DO NOT include ________.",
        A: ["strings", 
            "booleans", 
            "alerts", 
            "numbers"],
        CA: "alerts"
    },
    {
        Q: "The condition in an if / else statement is enclosed with ________.",
        A: ["quotes", 
            "curly brakets",
            "parenthesis",
            "square brackets"],
        CA: "parenthesis"
    },
    {
        Q: "Arrays in JavaScript can be used to store ________.",
        A: ["numbers and strings", 
            "other arrays",
            "booleans",
            "all of the above"],
        CA: "all of the above"
    },
    {
        Q: "String values must be enclosed within ________ when being assigned to variables.",
        A: ["commas", 
            "curly brackets",
            "quotes",
            "parenthesis"],
        CA: "quotes"
    },
    {
        Q: "A very useful tool used during development and debugging for printing content to the debugger is ________.",
        A: ["JavaScript", 
            "terminal/bash",
            "for loops",
            "console.log"],
        CA: "console.log"
    }
];


function displayQuestion() {
    if (answerStatus) {
        markAnswer(answerStatus);
    }
    //Check if this is the first question. If so remove the start button
    if (questionNumber === 0) {
        startButtonEl.remove();
    } 
    //check if the last question has been asked. If so end quiz.
    if (questionNumber === theQuiz.length) {
        endQuiz();
    } else {
        correctAnswer = theQuiz[questionNumber].CA;
        // display question on screen
        questionEl.textContent = theQuiz[questionNumber].Q;
        questionEl.style.textAlign = "left";
        answerEl.style.textAlign = "left";
        answerEl.textContent = "";
        let noOfAnswers = theQuiz[questionNumber].A.length;
        let answerListEl = document.createElement("ol");
    
        for (var i=0; i<noOfAnswers; i++) {
            let displayedAnswer = Math.floor(Math.random()*theQuiz[questionNumber].A.length);
            //loops through answers and puts them on screen in random order
            if (theQuiz[questionNumber].A.length > 1 && theQuiz[questionNumber].A[displayedAnswer] === "all of the above") {
                displayedAnswer--;
            }
            let answerOptionEl = document.createElement("a");
            answerOptionEl.href = "#";
            answerOptionEl.innerHTML = "<li>" + theQuiz[questionNumber].A[displayedAnswer] + "</li>";
            answerListEl.appendChild(answerOptionEl);
            theQuiz[questionNumber].A.splice(displayedAnswer, 1); 
        }
        answerEl.appendChild(answerListEl);

        answerListEl.addEventListener("click", checkAnswer);
        questionNumber++;
    }
}

function checkAnswer(event) {
    let answerClicked = event.target.textContent;

    if (answerClicked === correctAnswer) {
        answerStatus = "Correct!";
        noOfCorrectAnswers++;

    } else {
        answerStatus ="Incorrect!";
        score-=10;
        timerEl.textContent = score;
    }
    displayQuestion();


}

function markAnswer(ans) {
    let answerMarkEl = document.querySelector("#answer-mark");
    if (answerMarkEl) {
        answerMarkEl.textContent = ans;
    } else {
        answerMarkEl = document.createElement("div");
        answerMarkEl.setAttribute("id", "answer-mark");
        answerMarkEl.textContent = ans;
        questionAreaEl.appendChild(answerMarkEl);
    }
 
}

function endQuiz() {
    answerEl.textContent="";
    clearInterval(timerCountdown); 
    // Checks to make sure the player got at least one answer right.
    if (noOfCorrectAnswers === 0) {
        score = 0;
    } 
    questionEl.textContent = endQuizMessage;
    answerEl.textContent = "Your final score is " + score + ".";
    if (score > 0) {
        let finalForm = document.createElement("form");
        //let formLabel = setAttribute("label");
        finalForm.innerHTML = "<label>Enter Initials</label><input type=text name='initials' id='initials'><input class='submit' type='submit' value='Submit'> "
        //formLabel.textContent = "Enter Initials";
        answerEl.appendChild(finalForm);

    }

}


function runTimer() {
    timerEl.textContent = score;
    timerCountdown = setInterval(function() {
        score--;
        if (score <= 0) {
            score = 0;
            clearInterval(timerCountdown);
            endQuizMessage = "Time’s up!"
            endQuiz();
        }
        timerEl.textContent = score;

    }, 1000)
}

function startQuiz() {
    displayQuestion(questionNumber);
    runTimer();
}

startButtonEl.addEventListener("click", startQuiz)

//localStorage.clear();