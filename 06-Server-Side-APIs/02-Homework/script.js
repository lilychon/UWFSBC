var APIKey = "166a433c57516f51dfab1f7edaed8413";

var cities = [];

$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    $(".fiveDay").empty();
    var city = $("#cityInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon
            ,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse);


            const currentDate = moment().format("M/D/YYYY");

            $(".city").html("<h2>" + response.city.name + " (" + currentDate + ")" + "</h2>");
            $(".temp").text("Temperature: " + response.list[0].main.temp.toFixed(1) + " °F");
            $(".humidity").text("Humidity: " + response.list[0].main.humidity + "%");
            $(".wind").text("Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " MPH");
            $(".uvIndex").html("UV Index: " + "<p>" + uvResponse.value + "</p>");

            var cityHistory = $("<button>" + response.city.name + "</button>");
            cityHistory.addClass("btn btn-light w-100");
            $(".cityHistory").append(cityHistory);


            for (var i = 1; i < 6; i++) {
                const date = moment().add(i, 'days').format("M/D/YYYY");
                $("<div>", {
                    html: "<h3>" + date + "</h3>" + "Temp: " + response.list[i].main.temp.toFixed(1) + " °F" + "<br>" + "Humidity: " + response.list[i].main.humidity.toFixed(1) + "%",
                    id: "fiveDayBox",
                    appendTo: ".fiveDay"
                })

            }
            // cityHistory.onclick("click", function(history) {
            //     history.preventDefault();
            //     event(); 
            
        })
    })
})

