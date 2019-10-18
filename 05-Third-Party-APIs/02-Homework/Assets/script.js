$(document).ready(function () {
    const currentDate = moment().format("dddd, MMMM Do");

  $("#currentDay").html(currentDate);
})

var times = ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];
const currentTime = moment().format("H");

function buildRows() {

    var startTime = 8;

    for (var i = 0; i < times.length; i++) {

        var row = $("<div class='row'>");

        var time = $("<div>");
        time.attr("data-timeOption", times[i]);
        time.addClass("time");
        time.text(times[i]);
        var timeSpan = $("<span>");
        timeSpan.append(time);

        var textArea = $("<textarea/>");
        textArea.attr("id",startTime++);
        textArea.addClass("userInput");
        var textSpan = $("<span>");
        // userInput.addClass("col-md")
        textSpan.append(textArea);

        if (startTime === currentTime) {
            textArea.addClass("present")
        } else if (startTime > currentTime) {
            textArea.addClass("future")
        } else {
            textArea.addClass("past")
        }

        var saveBtn = $("<button>");
        saveBtn.addClass("fas fa-save saveBtn");

        row.append(timeSpan, textSpan, saveBtn);

        $(".container").append(row);

        
    }
    $(".saveBtn").on("click",
      function (event) {
          event.preventDefault();
          console.log("thisran");
          var aa = textArea.value;
          console.log(aa);

    localStorage.setItem("userInput", aa);
    renderLastRegistered();    

})
}

buildRows();
