var scoreDisplayEl = document.querySelector('section div');
var scoreDisplayAreaEl = document.querySelector('section div ol');
var goBackButtonEl = document.querySelector('#go-back');
var clearScoresButtonEl = document.querySelector('#clear-scores');
var theScores = JSON.parse(localStorage.getItem("scores"));
if (!theScores) {
    theScores = [{init:"No high scores yet. Please play the quiz", scr:""}]
}


function displayScores(){
    let displayText = "";
    let scoreLineEl;
    let scoreLineContentEl;
    for (var i = 0; i < theScores.length; i++) {
        displayText = "<div class='initials'>" + theScores[i].init + "</div> <div class='score'>" +theScores[i].scr + "</div>";
        scoreLineEl = document.createElement("div");
        if (i % 2 === 0) {
            scoreLineEl.className = "odd";
        } else {
            scoreLineEl.className = "even";
        }
        scoreLineContentEl = document.createElement("li");
        scoreLineContentEl.innerHTML = displayText;
        scoreLineEl.appendChild(scoreLineContentEl);

        
        scoreDisplayAreaEl.appendChild(scoreLineEl);

    }

}

function clearScores() {
    localStorage.removeItem("scores");
    location.reload();
}

if (theScores[0].scr === "") {
    scoreDisplayEl.textContent = theScores[0].init;
    clearScoresButtonEl.remove();
} else {
    displayScores();
}

goBackButtonEl.addEventListener('click', function(){
    window.location = "index.html";
})

clearScoresButtonEl.addEventListener('click', clearScores);
