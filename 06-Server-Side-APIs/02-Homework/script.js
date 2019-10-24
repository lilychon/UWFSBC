var APIKey = "166a433c57516f51dfab1f7edaed8413";

var cities = [];

$(".searchBtn").on("click", function (event) {
    event.preventDefault();
    displayWeatherInfo();
})

function displayWeatherInfo() {
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

            // $(".city").appendTo(weather());

            if (response.list[0].weather[0].main === "Clear") {
                $("<i>", {
                    class: "fas fa-sun weatherIcon",
                    appendTo: ".city"
                    
                })
            }
            else if (response.list[0].weather[0].main === "Clouds") {
                $("<i>", {
                    class: "fas fa-cloud weatherIcon",
                    appendTo: ".city"
                    
                })
            }
            else if (response.list[0].weather[0].main === "Snow") {
                $("<i>", {
                    class: "fas fa-snowflake weatherIcon",
                    appendTo: ".city"
                    
                })
            }
            else if (response.list[0].weather[0].main === "Drizzle") {
                $("<i>", {
                    class: "fas fa-cloud-rain weatherIcon",
                    appendTo: ".city"
                    
                })
            }
            else if (response.list[0].weather[0].main === "Rain") {
                $("<i>", {
                    class: "fas fa-cloud-showers-heavy weatherIcon",
                    appendTo: ".city"
                    
                })
            }

            $(".temp").html("<p>" + "Temperature: " + response.list[0].main.temp.toFixed(1) + " °F" + "</p>");
            $(".humidity").html("<p>" + "Humidity: " + response.list[0].main.humidity + "%" + "</p>");
            $(".wind").html("<p>" + "Wind Speed: " + response.list[0].wind.speed.toFixed(1) + " MPH" + "</p>");
            $(".uvIndex").html("UV Index: " + "<h4>" + uvResponse.value + "</h4>");

            var cityHistory = $("<button>" + response.city.name + "</button>");
            cityHistory.addClass("btn btn-light w-100 cityBtn");
            $(".cityHistory").append(cityHistory);


            for (var i = 1; i < 6; i++) {
                const date = moment().add(i, 'days').format("M/D/YYYY");
                $("<div>", {
                    html: "<h3>" + date + "<br>" + "</h3>" + "Temp: " + response.list[i].main.temp.toFixed(1) + " °F" + "<br>" + "Humidity: " + response.list[i].main.humidity.toFixed(1) + "%",
                    id: "fiveDayBox",
                    appendTo: ".fiveDay"
                })
            }
            // cityHistory.onclick("click", function(history) {
            //     history.preventDefault();
            //     event(); 
            // })

            // function weather() {
            //     if (response.list[0].weather[0].main === "Clear") {
            //         $("<i>", {
            //             class: "fas fa-sun weatherIcon"
            //         })
            //     }
            //     else if (response.list[0].weather[0].main === "Clouds") {
            //         $("<i>", {
            //             class: "fas fa-cloud weatherIcon"
            //         })
            //     }
            //     else if (response.list[0].weather[0].main === "Snow") {
            //         $("<i>", {
            //             class: "fas fa-snowflake weatherIcon"
            //         })
            //     }
            //     else if (response.list[0].weather[0].main === "Drizzle") {
            //         $("<i>", {
            //             class: "fas fa-cloud-rain weatherIcon"
            //         })
            //     }
            //     else if (response.list[0].weather[0].main === "Rain") {
            //         $("<i>", {
            //             class: "fas fa-cloud-showers-heavy weatherIcon"
            //         })
            //     }
            // }

        })
    })
}

$(document).on("click", ".cityBtn", displayWeatherInfo);

