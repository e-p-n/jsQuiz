var questionNumber = 0;
var score = 75;
var correctAnswer = "";
var timerEl = document.querySelector('#timer');
var introEl = document.querySelector('#intro');
var questionAreaEl = document.querySelector('section');
console.log(questionAreaEl);
var questionEl = document.querySelector('section h1');
var answerEl = document.querySelector('section div');
var startButtonEl = document.querySelector('section button');
var highScore = JSON.parse(localStorage.getItem("scores"));
if (!highScore) {
    highScore = [];
}
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
            "curly brackets",
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

// Checks if answer clicked matches the correct answer
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
        
        //loops through answers and puts them on screen in random order
        for (var i=0; i<noOfAnswers; i++) {
            let displayedAnswer = Math.floor(Math.random()*theQuiz[questionNumber].A.length);
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
        questionNumber++;
        answerListEl.addEventListener("click", checkAnswer);
    }
}

function endQuiz() {
    clearInterval(timerCountdown); 
    // Checks to make sure the player got at least one answer right and changes the score to 0 if the did not.
    if (noOfCorrectAnswers === 0) {
        score = 0;
    } 
    questionEl.textContent = endQuizMessage;
    answerEl.textContent = "Your final score is " + score + ".";
    if (score > 0) {
        let finalForm = document.createElement("form");
        //let formLabel = setAttribute("label");
        finalForm.innerHTML = "<label>Enter Initials</label><input type='text' name='initials' id='initials' maxlength='3'><input class='submit' type='submit' value='Submit'> "
        //formLabel.textContent = "Enter Initials";
        answerEl.appendChild(finalForm);
        var submitScoreButtonEl = document.querySelector(".submit")
        submitScoreButtonEl.addEventListener("click", saveHighScore);
    } else {
        let restartButton = document.createElement("button");
        restartButton.textContent = "Try again";
        answerEl.appendChild(restartButton);
        var restartButtonEl = document.querySelector("button");
        restartButtonEl.addEventListener("click", function(){
            location.reload();
        });
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
function saveHighScore(event) {
    event.preventDefault();

    let initials = document.getElementById('initials').value;
    if (initials) {
        newScore = {init:initials.toUpperCase(), scr:score};
        highScore.push(newScore);
        //console.log("Highscore after push: ");
        console.log("Highscore after push: ", highScore);
        highScore.sort((a, b) => a.scr - b.scr);
        highScore.reverse();
        console.log(highScore)
        if (highScore.length > 10) {
            highScore.splice(10,1);
        }
        localStorage.setItem("scores", JSON.stringify(highScore));
        //window.location = "highScores.html";    
    }
}

function startQuiz() {
    displayQuestion(questionNumber);
    runTimer();
}

startButtonEl.addEventListener("click", startQuiz);

//localStorage.clear();