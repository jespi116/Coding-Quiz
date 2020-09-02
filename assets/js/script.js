var questions = [
    {
        q: " 2 + 2 = ?",
        c: ["4", "2", "0", "-4"],
        a: "4"
    },
    {
        q: "1 + 1 = ?",
        c: ["1", "4", "2", "6"],
        a: "2"
    },
    {
        q: "3 + 2 = ?",
        c: ["6", "2", "4", "5"],
        a: "5"
    },
    {
        q: "10 - 7 = ?",
        c: ["2", "3", "1", "5"],
        a: "3"
    },
    {
        q: "50 - 23 = ?",
        c: ["27", "17", "31", "24"],
        a: "27"
    }
]

var startEl = document.getElementById("start");
var endEl = document.getElementById("end");
var correctEl = document.getElementById("correct");
var scoreEl = document.getElementById("score");
var initialsEl = document.getElementById("initials")
var submitBtn = document.getElementById("submit");
var headerEl = document.querySelector(".header");
var viewEl = document.querySelector(".view");
var timerEl = document.querySelector(".timer");
var questionsEl = document.querySelector(".questions");
var descriptionEl = document.querySelector(".description");
var answersEl = document.querySelector(".answers");
var startBtn = document.querySelector(".start-btn");
var quizEl = document.querySelector(".quiz");
var containerEl = document.querySelector(".container");
var highscoresEl = document.getElementById("highscores");
var olEl = document.querySelector(".ol");
var backBtn = document.querySelector(".back-btn");
var clearBtn = document.querySelector(".clear-btn");

var time = 75;
var queCounter = 0;

var startQuiz = function(){
    
    timerEl.textContent = time;
    countdown = setInterval(timer, 1000);
    startEl.classList.add('hide');

    queFunc();
    
}

var queFunc = function() {
    var currentQuestion = questions[queCounter];
    questionsEl.textContent = currentQuestion.q;

    answersEl.innerHTML = "";
  
  currentQuestion.c.forEach(function(choice, i) {
    
    var answers = document.createElement("button");
    answers.setAttribute("class", "btn answer-btn");
    answers.setAttribute("value", choice);

    answers.textContent = choice;

    answers.addEventListener("click", click);
    
    answersEl.appendChild(answers);

});
}

var click = function() {
    if (this.value === questions[queCounter].a) {

        correctEl.textContent = "correct!";
    }
    else{
        time-= 10;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;

        correctEl.textContent = "wrong!";
        
    }
    correctEl.classList.remove('hide');

    queCounter++

    if(queCounter === questions.length) {
        endQuiz();
    }
    else{
        queFunc();
    }
}

var endQuiz = function() {
    clearInterval(countdown);
    endEl.classList.remove('hide');
    quizEl.classList.add('hide');

    scoreEl.textContent = time;
}

var timer = function() {
    time--;    
    timerEl.textContent = time;
    if (time <= 0){
        endQuiz();
    }
}

var highscore = function() {
    var initials = initialsEl.value
    if(initials !== ""){
    
    var newScore = {
      score: time,
      initials: initials
    }

    var highscores =JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.push(newScore);
    console.log(highscores);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    correctEl.classList.add('hide');
    goToHs()
    }
}

var goToHs = function() {
    headerEl.classList.add('hide');
    containerEl.classList.add('hide');
    highscoresEl.classList.remove('hide');

    var highscores =JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
      });
    
    highscores.forEach(function(score) {

    var liEl = document.createElement("li");
    liEl.textContent = score.initials + " - " + score.score;
    console.log(liEl)
    olEl.appendChild(liEl);
    });


}

var clear = function() {
    localStorage.removeItem("highscores");
    location.reload();
}

var back = function() {
    location.reload();
}

backBtn.addEventListener("click", back);
clearBtn.addEventListener("click", clear);
viewEl.addEventListener("click", goToHs);
submitBtn.addEventListener("click", highscore);
startBtn.addEventListener("click", startQuiz);