$(document).ready(function () {
    const currentDate = moment().format("dddd, MMMM Do");

    $("#currentDay").html(currentDate);


    var times = ["9AM", "10AM", "11AM", "12AM", "1PM", "2PM", "3PM", "4PM", "5PM"];
    const currentTime = moment().format("H");
    var schedule = {}

    function buildRows() {

        var startTime = 8;

        for (var i = 0; i < times.length; i++) {

            var row = $("<div class='row'>");

            var time = $("<div>");
            time.attr("data-timeOption", times[i]);
            // time.addClass("time");
            time.text(times[i]);
            var timeSpan = $("<span>");
            timeSpan.addClass("col-md-1 time");
            timeSpan.append(time);

            var textArea = $("<textarea/>");
            textArea.attr("id", startTime++);
            textArea.addClass("userInput");
            var textSpan = $("<span>");
            textSpan.addClass("row col-md-10");
            // userInput.addClass("col-md")
            textSpan.append(textArea);

            if (startTime == currentTime) {
                textArea.addClass("present")
            } else if (startTime > currentTime) {
                textArea.addClass("future")
            } else {
                textArea.addClass("past")
            }

            var saveBtn = $("<button>");
            saveBtn.addClass("fas fa-save col-md-1 saveBtn");

            row.append(timeSpan, textSpan, saveBtn);

            $(".container").append(row);


        }

        schedule = JSON.parse(localStorage.getItem("getValue"))
        console.log(schedule)
        for (key in schedule) {
            console.log(key, schedule[key])
            $("#" + key).text(schedule[key])
        }

        $(".saveBtn").on("click",
            function (event) {
                event.preventDefault();
                console.log(this)
                var userInput = $(this).parent().find(".userInput").val();
                var hour = $(this).parent().find(".userInput").attr("id")
                console.log(hour, userInput);
                var scheduleTemp = JSON.parse(localStorage.getItem("getValue"))
                if (scheduleTemp === null) {
                    scheduleTemp = {}
                }
                scheduleTemp[hour] = userInput
                localStorage.setItem("getValue", JSON.stringify(scheduleTemp));
            })
    }


    buildRows();

})