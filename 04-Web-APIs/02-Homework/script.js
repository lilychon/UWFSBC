var viewT = document.querySelector("#viewT");
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var content = document.querySelector("#content");
var test = false;
var score = 0;
// var quiz = {};
const lastQuestion = questions.length - 1;
var currentQuestion = 0;
var secondsLeft = 75;

function display_start() {
  var h1El = document.createElement("h1");
  h1El.textContent = "Coding Quiz Challenge";
  content.append(h1El);

  var h3El = document.createElement("h3");
  h3El.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  content.append(h3El);

  var buttonEl = document.createElement("button");
  buttonEl.textContent = "Start Quiz";
  content.append(buttonEl);

  buttonEl.addEventListener("click", function () {
    content.removeChild(h1El);
    content.removeChild(h3El);
    content.removeChild(buttonEl);
    startQuiz();
    setTime();
  });
}

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

function startQuiz() {
  content.innerHTML = "";
  var h2El = document.createElement("h2");
  h2El.setAttribute("class", "question");
  h2El.setAttribute("question-index", currentQuestion);
  h2El.textContent = questions[currentQuestion].title;
  content.append(h2El);

  for (var j = 0; j < questions[currentQuestion].choices.length; j++) {
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "buttons");
    buttonEl.setAttribute("choice-index", j);
    buttonEl.textContent = j + 1 + ". " + questions[currentQuestion].choices[j];
    content.append(buttonEl);

    buttonEl.addEventListener("click", function (event) {
      var btnChoice = event.target;
      var h2Question = document.querySelector(".question");
      var choiceIndex = parseInt(btnChoice.getAttribute("choice-index"));
      var question = questions[h2Question.getAttribute("question-index")];
      if (choiceIndex === question.answer) {
        var hrEl = document.createElement("hr")
        var pEl = document.createElement("p");
        pEl.textContent = "Correct!";
        content.append(hrEl);
        content.append(pEl);
        score++
      } else {
        var hrEl = document.createElement("hr")
        var pEl = document.createElement("p");
        pEl.textContent = "Wrong!";
        content.append(hrEl);
        content.append(pEl);
        score--
        secondsLeft -= 10
      }
      currentQuestion++
      if (currentQuestion > questions.length - 1) {
        showResult();
      } else {
        setTimeout(startQuiz, 1000);
      }
    })
  }
}

function showResult() {
  content.innerHTML = "";
  scoreForm();
  var highScore = JSON.parse(localStorage.getItem("highScore"));
  if (!highScore) {
    highScore = {}
  }
  var name = "LA";
  highScore[name] = 12;
  var myScoreStr = JSON.stringify(highScore);
  localStorage.setItem('highScore', myScoreStr);
}

function scoreForm() {
  var form = document.querySelector("form");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

display_start();