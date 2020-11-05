// var cityArray = [];
$(document).ready(function () {
    var cities = JSON.parse(localStorage.getItem("cities"));
    renderCities();
    function renderCities() {
        // var cities = JSON.parse(localStorage.getItem("cities"));
        console.log(cities);
        if (cities) {
            var citiesEl = $("#cities")
            citiesEl.empty();
            for (var i = 0; i < cities.length; i++) {
                var cityEl = $("<button>").attr("id", "city-" + i).addClass("py-2 mt-2 btn-group-vertical bg-white city-buttons btn-block btn-sm").text(cities[i]);
                citiesEl.append(cityEl);

            }



        }



    }
    // var cityArray = [];
    function citySearch() {
        $("#forecast").empty();
        $("ul").empty();
        var cityName = $("#city-name").val().trim().toUpperCase();
        var apiKey = "783997aa107a158f59a5294fd9806517";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            cities.push(cityName);
            var date = moment().format("L");

            localStorage.setItem("cities", JSON.stringify(cities));

            var cityLat = response.coord.lat;
            var cityLong = response.coord.lon;
            var searchCity = response.name;
            $("h2").text(searchCity + " ");
            $("h2").append("(" + date + ")");
            console.log(date);
            var cityTemp = response.main.temp;
            var cityHumidity = response.main.humidity;
            var cityWind = response.wind.speed;

            var liEl = $("<li>").text("Temperature " + cityTemp);
            $("ul").append(liEl);
            var liEl2 = $("<li>").text("Humidity " + cityHumidity + "%");
            var liEl3 = $("<li>").text("Wind Speed " + cityWind + " MPH");
            $("ul").append(liEl2);
            $("ul").append(liEl3);

            function cityUv() {
                var queryUrl2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + apiKey;

                $.ajax({
                    url: queryUrl2,
                    method: "GET"
                }).then(function (res) {
                    console.log(res);
                    var uvIndex = res.value;
                    var liEl4 = $("<li>").text("UV Index " + uvIndex);
                    $("ul").append(liEl4);

                    if (res.value >= 3 || res.value <= 5) {
                        liEl4.addClass("index");
                    }
                    else if (res.value >= 6 || res.value <= 7) {
                        liEl4.addClass("index2");
                    }
                    else if (res.value >= 8 || res.value <= 10) {
                        liEl4.addClass("index3");
                    }
                    else {
                        liEl4.addClass("index4");
                    }
                });
            }

            function fiveDay() {
                $("#5-day").empty();

                var queryUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

                $.ajax({
                    url: queryUrl3,
                    method: "GET"
                }).then(function (res2) {
                    var h2El = $("<h2>").text("5-Day-Forecast");
                    $("#forecast").append(h2El);
                    for (i = 0; i < res2.list.length; i += 8) {
                        console.log(res2);

                        // $(".col-md-9").append(h2El);
                        var deckEl = $("<div>").addClass("card shadow-lg text-black bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem");

                        var date1 = res2.list[i].dt_txt;
                        var temp1 = res2.list[i].main.temp;
                        var humid1 = res2.list[i].main.humidity;
                        var icon1 = res2.list[i].weather[0].id;

                        var cardText1 = $("<h5>").addClass("card-title mt-0");
                        var cardTemp1 = $("<p>").addClass("card-text pb-2");
                        var cardHumid1 = $("<p>").addClass("card-text pb-2");
                        var cardIcon1 = $("<p>").addClass("card-text");


                        cardIcon1.text(icon1);
                        cardTemp1.text(temp1);
                        cardText1.text(date1);
                        cardHumid1.text(humid1);


                        if (res2.list[i].weather[0].main === "Clear") {
                            var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                            cardIcon1.text(iconEl1);
                            deckEl.append(cardText1, "Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);


                            var day5El = $("#5-day").append(deckEl);
                            $(".col-md-9").append(day5El);

                        }
                        else if (res2.list[i].weather[0].main === "Thunderstorm") {
                            var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/11d@2x.png").addClass("weather-image");

                            cardIcon1.text(iconEl1);
                            deckEl.append(cardText1, "Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);

                            var day5El = $("#5-day").append(deckEl);
                            $(".col-md-9").append(day5El);

                        }

                        else if (res2.list[i].weather[0].main === "Rain") {
                            var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d@2x.png").addClass("weather-image");

                            cardIcon1.text(iconEl1);
                            deckEl.append(cardText1, "Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);

                            var day5El = $("#5-day").append(deckEl);
                            $(".col-md-9").append(day5El);

                        }

                        else if (res2.list[i].weather[0].main === "Snow") {
                            var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d@2x.png").addClass("weather-image");

                            cardIcon1.text(iconEl1);
                            deckEl.append(cardText1, "Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);

                            var day5El = $("#5-day").append(deckEl);
                            $(".col-md-9").append(day5El);



                        }

                        else if (res2.list[i].weather[0].main === "Clouds") {
                            var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/04d@2x.png").addClass("weather-image");

                            cardIcon1.text(iconEl1);
                            deckEl.append(cardText1, "Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);

                            var day5El = $("#5-day").append(deckEl);
                            $(".col-md-9").append(day5El);

                        }



                    }

                })
            }
            fiveDay();
            cityUv();
            renderCities();
        });
    }

    $(".search").on("click", function (event) {
        event.preventDefault();
        citySearch();

    });

    $(".city-buttons").on("click", function () {
        var buttonText = $(this).text()
        console.log(buttonText);
        searchHistory();
        // cityUv();        
        function searchHistory() {
            $("ul").empty();
            $(".forecast").empty();
            // $("ul").empty();
            var apiKey = "783997aa107a158f59a5294fd9806517";
            var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonText + "&appid=" + apiKey;

            $.ajax({
                url: queryUrl,
                method: "GET"
            }).then(function (response) {
                var date = moment().format("L");
                var cityLat = response.coord.lat;
                var cityLong = response.coord.lon;
                var searchCity = response.name;
                $("h2").text(searchCity + " ");
                $("h2").append("(" + date + ")");
                console.log(date);
                var cityTemp = response.main.temp;
                var cityHumidity = response.main.humidity;
                var cityWind = response.wind.speed;
                var liEl = $("<li>").text("Temperature " + cityTemp);
                $("ul").append(liEl);
                var liEl2 = $("<li>").text("Humidity " + cityHumidity + "%");
                var liEl3 = $("<li>").text("Wind Speed " + cityWind + " MPH");
                $("ul").append(liEl2);
                $("ul").append(liEl3);
                cityUv();
                function cityUv() {
                    var queryUrl2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLong + "&appid=" + apiKey;

                    $.ajax({
                        url: queryUrl2,
                        method: "GET"
                    }).then(function (res) {
                        console.log(res);
                        var uvIndex = res.value;
                        var liEl4 = $("<li>").text("UV Index " + uvIndex);
                        $("ul").append(liEl4);
                    });
                }



            })

        }
    })
});

