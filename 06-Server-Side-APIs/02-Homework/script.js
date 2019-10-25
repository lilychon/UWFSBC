var APIKey = "166a433c57516f51dfab1f7edaed8413";

var cities = [];

$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    displayWeatherInfo();
})

function buildForecast(response) {

    for (var i = 1; i < 6; i++) {
        const date = moment().add(i, 'days').format("M/D/YYYY");
        // $("<div>", {
        //     html: "<h3>" + date + "<br>" + "</h3>" + "Temp: " + response.list[i].main.temp.toFixed(1) + " °F" + "<br>" + "Humidity: " + response.list[i].main.humidity.toFixed(1) + "%",
        //     id: "fiveDayBox",
        //     appendTo: ".fiveDay"
        // })
        var fiveDayDiv = $("<div id='fiveDayBox'>");
        var fiveDayDivDate = $("<h3>");
        fiveDayDivDate.html(date);
        var icon = $("<i>");
        // $(".icon").append(icon);
        // append the if else statement here
        var fiveDayDivTemp = $("<span>");
        fiveDayDivTemp.html("Temp: " + response.list[i].main.temp.toFixed(1) + " °F" + "<br>");
        var fiveDayDivHumidity = $("<span>");
        fiveDayDivHumidity.html("Humidity: " + response.list[i].main.humidity.toFixed(1) + "%")

        fiveDayDiv.append(fiveDayDivDate, icon, fiveDayDivTemp, fiveDayDivHumidity);

        $(".fiveDay").append(fiveDayDiv);

        var weatherIcon = response.list[i].weather[0].main;

        if (weatherIcon === "Clear")
            icon.addClass("fas fa-sun weatherIcon");

        else if (weatherIcon === "Clouds")
            icon.addClass("fas fa-cloud weatherIcon");

        else if (weatherIcon === "Snow")
            icon.addClass("fas fa-snowflake weatherIcon");

        else if (weatherIcon === "Drizzle")
            icon.addClass("fas fa-cloud-rain weatherIcon");

        else if (weatherIcon === "Rain")
            icon.addClass("fas fa-cloud-showers-heavy weatherIcon");
    }
}


function displayWeatherInfo() {
    $(".fiveDay").empty();
    $(".weatherInfo").empty();
    var city = $("#cityInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        buildForecast(response);

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon
            ,
            method: "GET"
        }).then(function (uvResponse) {
            console.log(uvResponse);

            const currentDate = moment().format("M/D/YYYY");

            $("<div>", {
                html: "<h2>" + response.city.name + " (" + currentDate + ")" + "</h2>",
                class: "city",
                appendTo: ".weatherInfo"
            })
            $("<div>", {
                attr: "#icon",
                appendTo: ".weatherInfo"
            })
            $("<div>", {
                html: "<p>" + "Temperature: " + response.list[0].main.temp.toFixed(1) + " °F" + "</p>",
                class: "temp",
                appendTo: ".weatherInfo"
            })
            $("<div>", {
                html: "<p>" + "Humidity: " + response.list[0].main.humidity + "%" + "</p>",
                class: "humidity",
                appendTo: ".weatherInfo"
            })
            $("<div>", {
                html: "<p>" + "Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " MPH" + "</p>",
                class: "wind",
                appendTo: ".weatherInfo"
            })
            $("<div>", {
                html: "UV Index: " + "<h4>" + uvResponse.value + "</h4>",
                class: "uvIndex",
                appendTo: ".weatherInfo"
            })

            var weatherIcon = response.list[0].weather[0].main;

            if (weatherIcon === "Clear")
                $("<div id='icon'>").addClass("fas fa-sun weatherIcon");
    
            else if (weatherIcon === "Clouds")
            $("<div id='icon'>").addClass("fas fa-cloud weatherIcon");
    
            else if (weatherIcon === "Snow")
            $("<div id='icon'>").addClass("fas fa-snowflake weatherIcon");
    
            else if (weatherIcon === "Drizzle")
            $("<div id='icon'>").addClass("fas fa-cloud-rain weatherIcon");
    
            else if (weatherIcon === "Rain")
            $("<div id='icon'>").addClass("fas fa-cloud-showers-heavy weatherIcon");
        
            // $(".city").html("<h2>" + response.city.name + " (" + currentDate + ")" + "</h2>");
            // $(".temp").html("<p>" + "Temperature: " + response.list[0].main.temp.toFixed(1) + " °F" + "</p>");
            // $(".humidity").html("<p>" + "Humidity: " + response.list[0].main.humidity + "%" + "</p>");
            // $(".wind").html("<p>" + "Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " MPH" + "</p>");
            // $(".uvIndex").html("UV Index: " + "<h4>" + uvResponse.value + "</h4>");

            var cityHistory = $("<button>" + response.city.name + "</button>");
            cityHistory.addClass("btn btn-light w-100 cityBtn");
            $(".cityHistory").append(cityHistory);

        })
    })
}

$(document).on("click", ".cityBtn", displayWeatherInfo);

