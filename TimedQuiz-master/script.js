// p;ull in page objects
let highscoreDiv = document.querySelector("#highscore");
let gameTimerEl = document.querySelector("#gameTimer");
let quesTimerEl = document.querySelector("#quesTimer");
let mainEl = document.querySelector("#details");
let timerTab = document.querySelector("#timers");


// let questionEl = document.querySelector("#question")
// let answersListEl = document.querySelector("#answer-list")

// set global variables - how do we move these into localized
var test = 0;
var score = 0;
var quiz = {};

var gameDuration = 0;
var gameSecElapsed = 0;
var gameInterval;

var questionDuration = 15;
var questionSecElapsed = 0;
var questionInterval;

// draw instruction
init();

// var startButton = document.querySelector("#startQuiz");

// function to display instructions
function init() {
  clearDetails();
  reset();
  // creates Heading element for main page
  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "This game gives you the opportunity to take a time quiz!";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " You will have 5 seconds to answer each question. If you answer correctly you will score points. The quicker you answer the more points you will score. If you score incorrectly you will not lose points, but you will be penalized time."; 

  // creates button to start the game
  let startQuiz = document.createElement("button");
  startQuiz.setAttribute("id", "startQuiz");
  startQuiz.setAttribute("class", "btn btn-secondary");
  startQuiz.textContent= "Start Quiz";

  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(startQuiz);

  startQuiz.addEventListener("click", playQuiz);
}

// function to clear details element of all children
function clearDetails() {
  mainEl.innerHTML = "";
}

function reset() {
  score = 0;

  gameDuration = 0;
  gameSecElapsed = 0;
  gameInterval;

  questionDuration = 15;
  questionSecElapsed = 0;
  questionInterval;
}

//start game
function playQuiz() {
  if (test) { console.log("--- playQuiz ---"); }
  // select quiz randomize questions
  
  quiz = setUpQuestions(questions);

  // displays timers
  timerTab.setAttribute("style", "visibility: visible;");

  // Start timers here
  gameDuration = quiz.length * 15;
  if (test) { console.log("duration g,q:",gameDuration,questionDuration); }

  startGameTimer();
  renderTime();

  //go to first question
  presentQuestion();
}

// function to get random question out of array
function setUpQuestions(arr) {
  if (test) {console.log("--- setUpQuestions ---");}
  //TODO get different topic
  // TODO randomize questions
  let ranQuest = [];

  for (let i=0; i<arr.length; i++) {
    ranQuest.push(arr[i]);
  }
  return ranQuest;
}

// function to redraw screen with  question 
function presentQuestion() {
  if (test) {console.log("--- presentQuestion ---");}
  // if (test) {console.log("cur.choices[i] " + cur.choices);}

  //reset time allows to answer question
  questionSecElapsed = 0;

  // checks for no more questions and exits
  if ( quiz.length === 0 ) {
    endOfGame();
    return;
  }

  // call question timer here
  // reduceQUiz global

  //sets current object (cur - question) by pulling out of reducedQuiz array leaving the remaining quetions in the array
  curQuestion = quiz.pop();

  //clears html to draw questions
  clearDetails();
   
  // add question to screen
  //build out display for new item
  let question = document.createElement("h1");
  // adds data value
  question.setAttribute("question", curQuestion.title);
  question.textContent = curQuestion.title;
  mainEl.appendChild(question)

  // create list as container to listen for answers
  let choiceBox = document.createElement("ul");
  choiceBox.setAttribute("id","choiceBox");
  mainEl.appendChild(choiceBox);

  //adds answers to screen
  for( let i=0; i<curQuestion.choices.length; i++ ) {
    // creates variable for each choice item
    let listChoice = document.createElement("li");
    // adds data value
    listChoice.setAttribute("choice-value", curQuestion.choices[i]);
    listChoice.textContent = curQuestion.choices[i];
    //add choice to page
    choiceBox.appendChild(listChoice)
  }

  // if (test) { console.log("cur", curQuestion);}

  // get answer from user
  // using the anymous function delays the invocation of the scoreAnswer
  choiceBox.addEventListener("click", function (){
    scoreAnswer(curQuestion);
  });
  // calls for the next questions
}

function scoreAnswer(cur) {
  if (test) { console.log("--- scoreAnswer ---");}
 // ensure that the event on the li
  var e = event.target;
  if ( e.matches("li")) {
    let selectedItem = e.textContent;
    // if (selectedItemm === quiz.)
    // if (test) { console.log("check quiz " + quiz.length); }
    // if (test) { console.log("selectedItem quiz " + selectedItem); }
    // if (test) { console.log("selectedItem cur " , cur.answer); }
    if ( selectedItem === cur.answer ) {
      // if (test) { console.log("correct answer");}
      score += questionDuration - questionSecElapsed;
      //TODO display correct
      //TODO music 
    } else {
      // if (test) { console.log("wrong answer");}
      //penelty for being wrong
      gameDuration -= 10;
      //TODO let user know they suck
    }
    presentQuestion();
  }
}

// function to set time for game timer
function setGameTime() {
  if (test) { console.log("--- setGameTime ---"); }
  if (test) { console.log("gameDuration " + gameDuration); }
  clearInterval(gameInterval);
  gameSeconds = gameDuration;
}


function renderTime() {
  if (test) { console.log(" --- renderTime --- "); }
  // if (test) { console.log("gameSecElapsed " + gameSecElapsed); }
  // if (test) { console.log("gameDuration " + gameDuration); }
  // if (test) { console.log("questionDuration " + questionDuration); }

  gameTimerEl.textContent = gameDuration - gameSecElapsed;
  quesTimerEl.textContent = questionDuration - questionSecElapsed;

  if ( (questionDuration - questionSecElapsed) < 1 ) {
    // game penelty for letting timer run out
    gameDuration -= 10;
    if (test) { console.log("too slow"); }
    presentQuestion();
  } 

  if ( (gameDuration - gameSecElapsed) < 1 ) {
   endOfGame();
  }
}

function startGameTimer () {
  if (test) { console.log("--- startGameTimer ---"); }
  setGameTime();

  gameInterval = setInterval(function() {
    gameSecElapsed++; 
    questionSecElapsed++; 
    renderTime();
  }, 1000);
}

function stopTime() {
  if (test) { console.log("--- stopTime --- ");}
  gameSeconds = 0;
  questionSeconds = 0;
  clearInterval(gameInterval);
}

// function of end of game
function endOfGame() {
  if (test) { console.log("--- endOfGame ---"); }
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "GAME OVER - I hope you have enjoyed this";

  // creates elements with the instructions for the game
  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.textContent = " Your score is " + score; 

  // creates button to start the game
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play again";

  // creates input for user to add initials
  let par = document.createElement("p");

  let initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for","userInitials");
  initialsLabel.textContent = "Enter Initials: ";

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");


  mainEl.appendChild(heading);
  mainEl.appendChild(instructions);
  mainEl.appendChild(initialsLabel);
  mainEl.appendChild(initialsInput);
  mainEl.appendChild(par);
  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);

  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) { 

      //create object for this score
      let thisScore = [ { name: initialsInput.value, score: score } ]; 

      //get highscores from memory
      let storedScores = JSON.parse(localStorage.getItem("highScores")); 
      if (test) { console.log("storedScore",storedScores); }

      if (storedScores !== null) { 
        storedScores.push(thisScore[0]); 
      } else {
        storedScores = thisScore;
      }

      localStorage.setItem("highScores", JSON.stringify(storedScores));
      highScores();
    }
  });
}

function highScores() {
  stopTime();
  clearDetails();

  timerTab.setAttribute("style", "visibility: hidden;");

  let storedScores = JSON.parse(localStorage.getItem("highScores")); 

  let heading = document.createElement("p");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "High Score Hall of Fame";

  mainEl.appendChild(heading);

  // Render a new li for each score
  // TODO check for this error 
  if ( storedScores !== null ) {
    for (var i = 0; i < storedScores.length; i++) {
      var s = storedScores[i];

      var p = document.createElement("p");
      p.textContent = s.name + " " + s.score;
      mainEl.appendChild(p);
    }
  } else {
      var p = document.createElement("p");
      p.textContent =  "Your Initials Here!"
      mainEl.appendChild(p);
  }


  // creates button to start the game
  let playAgain = document.createElement("button");
  playAgain.setAttribute("id", "playAgain");
  playAgain.setAttribute("class", "btn btn-secondary");
  playAgain.textContent = "Play!";

  mainEl.appendChild(playAgain);

  playAgain.addEventListener("click", init);
}

highscoreDiv.addEventListener("click", highScores);