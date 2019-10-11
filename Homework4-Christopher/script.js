console.log("test");
//getelementid into a variable
var content = document.querySelector("#content");
var currentquestion = 0;

//start function
function display_start() {
    var h1El = document.createElement("h1");
    h1El.textContent = "Coding Quiz Challenge";
    content.append(h1El);

    var pEl = document.createElement("p")
    pEl.textContent = "description goes herelaskjdfldskjflkdjslfkjsdlfkjsdf";
    content.append(pEl);

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Start Quiz";
    content.append(buttonEl);

    content.addEventListener("click", function() {
        contentEl.removeChild(h1El);
        contentEl.removeChild(pEl);
        contentEl.removeChild(buttonEl);
        display_question();
    });
}

function display_question() {
    var h1El = document.createElement("h1");
    h1El.textContent = questions[currentquestion].title;
    content.append(h1El);

    for(var i = 0; i < questions[currentquestion].choices.length; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = i+1 + "." + questions[currentquestion].choices[i];
        content.append(buttonEl);

        buttonEl.addEventListener("click", function(event) {
            console.log(event);
            
        });

    }

}





display_start();