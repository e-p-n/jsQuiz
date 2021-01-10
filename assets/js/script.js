var questionNumber = 0;
var score = 75;
var correctAnswer = "";
var timerEl = document.querySelector('#timer');
var introEl = document.querySelector('#intro');
var questionAreaEl = document.querySelector('section');
var questionEl = document.querySelector('#question');
var answerEl = document.querySelector('section div');
var startButtonEl = document.querySelector('section button');
var highScore = JSON.parse(localStorage.getItem('scores'));
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

// Add text to screen that notifies user if they got the answer right/wrong
function markAnswer(ans) {
    let answerMarkEl = document.querySelector("#answer-mark");
    if (!answerMarkEl) {
        answerMarkEl = document.createElement("div");
        answerMarkEl.setAttribute("id", "answer-mark");
        questionAreaEl.appendChild(answerMarkEl);
    }
    answerMarkEl.textContent = ans;

}

// 
function endQuiz() {
    clearInterval(timerCountdown); 
    // Checks to make sure the player got at least one answer right and changes the score to 0 if the did not.
    if (noOfCorrectAnswers === 0) {
        score = 0;
    } 
    questionEl.textContent = endQuizMessage;
    answerEl.textContent = "Your final score is " + score + ".";
    //If the score is higher than 0 add a form for the user to enter their initials and load the high score subit is clicked. 
    if (score > 0) {
        let finalForm = document.createElement("form");
        finalForm.innerHTML = "<label>Enter Initials:</label><input type='text' name='initials' id='initials' maxlength='3'><input class='submit' type='submit' value='Submit'> "
        answerEl.appendChild(finalForm);
        var submitScoreButtonEl = document.querySelector(".submit")
        submitScoreButtonEl.addEventListener("click", saveHighScore);
    }
    //If the score is not higher than 0 add a Try again button that reloads the page when clicked.
    else {
        let restartButton = document.createElement("button");
        restartButton.textContent = "Try again";
        answerEl.appendChild(restartButton);
        var restartButtonEl = document.querySelector("button");
        restartButtonEl.addEventListener("click", function(){
            location.reload();
        });
    }

}

function saveHighScore(event) {
    event.preventDefault();

    let initials = document.getElementById('initials').value;
    //Checks to see if any characters have been entered in the initials form 
    if (initials) {
        // Add an object with the initials and score to the highScore array, then resort the array from highest value for scr to lowest
        highScore.push({init:initials.toUpperCase(), scr:score});
        highScore.sort((a, b) => b.scr - a.scr);
        //Limit the numer of high scores to 10, by removing the any the 11 object if it exists
        if (highScore.length > 10) {
            highScore.splice(10,1);
        }
        // add the highScore array to local storage
        localStorage.setItem("scores", JSON.stringify(highScore));
        window.location = "highScores.html";    
    } else {
        alert("Please enter your initials before continuing.")
    }
}


function displayQuestion() {    
    //Check if this is the first question. If so remove the start button, if not add "correct" / "incorrect" text to screen
    if (questionNumber === 0) {
        startButtonEl.remove();
    } else {
        markAnswer(answerStatus);
    }
    //check if the last question has been asked. If so end quiz.
    if (questionNumber === theQuiz.length) {
        endQuiz();
    } else {
        correctAnswer = theQuiz[questionNumber].CA;

        // display question on screen and adjust alignment of text on page
        questionEl.textContent = theQuiz[questionNumber].Q;
        questionEl.style.textAlign = "left";
        answerEl.style.textAlign = "left";
        answerEl.textContent = "";

        let noOfAnswers = theQuiz[questionNumber].A.length;

        //create ordered list to store answer options
        let answerListEl = document.createElement("ol");
        
        //loop through answers and add them to <li> elements
        for (var i=0; i<noOfAnswers; i++) {
            let displayedAnswer = Math.floor(Math.random()*theQuiz[questionNumber].A.length);
            if (theQuiz[questionNumber].A.length > 1 && theQuiz[questionNumber].A[displayedAnswer] === "all of the above") {
                displayedAnswer--;
            }
            let answerOptionEl = document.createElement("a");
            answerOptionEl.href = "#";
            answerOptionEl.innerHTML = "<li>" + theQuiz[questionNumber].A[displayedAnswer] + "</li>";
            //add list itme to ordered list
            answerListEl.appendChild(answerOptionEl);
            theQuiz[questionNumber].A.splice(displayedAnswer, 1); 
        }

        //add ordered list to page
        answerEl.appendChild(answerListEl);
        questionNumber++;
        answerListEl.addEventListener("click", checkAnswer);
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

startButtonEl.addEventListener("click", startQuiz);
