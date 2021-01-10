var scoreDisplayEl = document.querySelector('section div');
var scoreDisplayAreaEl = document.querySelector('section div ol');
var goBackButtonEl = document.querySelector('#go-back');
var clearScoresButtonEl = document.querySelector('#clear-scores');

//load high scores from locaol storage or create the "No High Scores" message if there is nothing in local storage.
var theScores = JSON.parse(localStorage.getItem("scores"));
if (!theScores) {
    theScores = [{init:"No high scores yet. Please play the quiz.", scr:""}]
}

// add each set of initials and high scores to the <ol>
function displayScores(){
    let scoreLineEl;
    let scoreLineContentEl;

    for (var i = 0; i < theScores.length; i++) {
        scoreLineEl = document.createElement("div");
        if (i % 2 === 0) {
            scoreLineEl.className = "odd";
        } else {
            scoreLineEl.className = "even";
        }
        scoreLineContentEl = document.createElement("li");
        scoreLineContentEl.innerHTML = "<div class='initials'>" + theScores[i].init + "</div> <div class='score'>" +theScores[i].scr + "</div>";
        scoreLineEl.appendChild(scoreLineContentEl);        
        scoreDisplayAreaEl.appendChild(scoreLineEl);

    }

}

// clear the high scores from local storage and reload the page
function clearScores() {
    localStorage.removeItem("scores");
    location.reload();
}


// check if there are high scores. If not, display default text and remove the "Clear Scores" button otherwise display the scores
if (theScores[0].scr === "") {
    scoreDisplayEl.textContent = theScores[0].init;
    clearScoresButtonEl.remove();
} else {
    displayScores();
}

// go back to the index.html file if the "Go Back button is clicked" 
goBackButtonEl.addEventListener('click', function(){
    window.location = "index.html";
})

//run the clearScores fuction if the "clear high scores" button is pressed
clearScoresButtonEl.addEventListener('click', clearScores);
