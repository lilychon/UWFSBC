// function showHighScores() {
//     content.innerHTML = "";

//     var highScore = JSON.parse(localStorage.getItem("highScore"));

//     var heading = document.createElement("h2");
//     heading.setAttribute("id", "main-heading");
//     heading.textContent = "Top 5 High Scores";

//     content.appendChild(heading);


//     if (highScore !== null) {
//         // highScore.sort((a,b) => (a.score < b.score) ? 1: -1);

//         var numScores2Display = 5;
//         if (highScore.length < 5) {
//             numScores2Display = highScore.length;
//         }

//         for (var i = 0; i < numScores2Display; i++) {
//             var s = highScore[i];

//             var p = document.createElement("p");
//             p.textContent = initialsInput + " " + score + " ( " + s.type + " )";
//             p.textContent = "SCORE HERE"
//             content.appendChild(p);
//         }
//     } else {
//         var p = document.createElement("p");
//         p.textContent = "Your Initials Here!"
//         content.appendChild(p);
//     }
// }

// var boxes = 9;

// function myFunction() {

//     for (var i = 0; i < boxes; i++) {
//         days();
//     }
// }

// function days() {
//     var x = document.createElement("INPUT");
//         x.setAttribute("type", "text");
//         x.setAttribute("value", "Hello World!");
//         document.body.appendChild(x);
// }

// myFunction();


