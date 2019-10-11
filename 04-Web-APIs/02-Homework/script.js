var viewT = document.querySelector("#viewT");
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var content = document.querySelector("#content");
var test = false;
var score = 0;
var quiz = {};

var currentQuestion = 0;
var secondsLeft = 75;

function display_start() {
  var h1El = document.createElement("h1");
  h1El.textContent = "Coding Quiz Challenge";
  content.append(h1El);

  var pEl = document.createElement("p")
  pEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  content.append(pEl);

  var buttonEl = document.createElement("button");
  buttonEl.textContent = "Start Quiz";
  content.append(buttonEl);

  buttonEl.addEventListener("click", function () {
    content.removeChild(h1El);
    content.removeChild(pEl);
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
  var h2El = document.createElement("h2");
  h2El.setAttribute("class", "question");
  h2El.setAttribute("question-index", currentQuestion);
  h2El.textContent = questions[currentQuestion].title;
  content.append(h2El);

  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "buttons");
    buttonEl.setAttribute("choice-index", i);
    buttonEl.textContent = i + 1 + ". " + questions[currentQuestion].choices[i];
    content.append(buttonEl);

    buttonEl.addEventListener("click", function (event) {
      var btnChoice = event.target;
      var h2Question = document.querySelector(".question");
      var choiceIndex = parseInt(btnChoice.getAttribute("choice-index"));
      var question = questions[h2Question.getAttribute("question-index")];
      if (choiceIndex === question.answer) {
        var pEl = document.createElement("p");
        var hrEl = document.createElement("hr")
        pEl.textContent = "Correct!";
        content.append(hrEl);
        content.append(pEl);
        score + 1
      } else {
        var pEl = document.createElement("p");
        var hrEl = document.createElement("hr")
        pEl.textContent = "Wrong!";
        content.append(pEl);
        content.append(hrEl);
        score-1
        secondsLeft -= 10
      }
    })
  }
}

display_start();