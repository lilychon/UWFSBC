var APIKey = "166a433c57516f51dfab1f7edaed8413";


$(".searchBtn").on("click", function(event) {
    event.preventDefault();
    var city = $("#cityInput").val();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        const currentDate = moment().format("M/D/YYYY");

        $(".city").html("<h2>" + response.name + " (" + currentDate + ")" + "</h2>");
        $(".temp").text("Temperature: " + response.main.temp);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".uvIndex").text("UV Index: " + response.wind.speed);

        $(".cityHistory").html("<button>" + response.name + "</button>");
    })

})

