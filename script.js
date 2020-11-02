// var cityArray = [];
$(document).ready(function () {

    function renderCities() {
        var cities = JSON.parse(localStorage.getItem("cities"));
        // var cities = ["Dallas"];
        // console.log(cities);
        if (cities) {
            var citiesEl = $("#cities")
            for (var i = 0; i < cities.length; i++) {
                var cityEl = $("<button>").attr("id", "city-" + i).addClass("py-2 mt-2 btn-group-vertical bg-white city-buttons btn-block btn-sm").text(cities[i]);
                citiesEl.append(cityEl);

            }
            // $(".city-buttons").on("click",citySearch);
            

        }
        
       $(".city-buttons").on("click",function(){
           var buttonText = $(this).text()
           console.log(buttonText);
           searchHistory();
            // cityUv();        
           function searchHistory(){
            $("ul").empty();
            $(".forecast").empty();
            // $("ul").empty();
            var apiKey = "783997aa107a158f59a5294fd9806517";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + buttonText + "&appid=" + apiKey;

        $.ajax({
            url:queryUrl,
            method:"GET"
        }).then(function(response){
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
        // searchHistory();
        // cityUv();          
           }
       }) 
    //    searchHistory();
    //    cityUv();
        
    }
    function citySearch() {
        $(".forecast").empty();
        $("ul").empty();
        var cityName = $("#city-name").val().trim().toUpperCase();
        var apiKey = "783997aa107a158f59a5294fd9806517";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {   
            var cityArray = [];
            console.log(response);
            cityArray.push(cityName);
            var date = moment().format("L");

            localStorage.setItem("cities", JSON.stringify(cityArray));
            var cityLat = response.coord.lat;
            var cityLong = response.coord.lon;
            var searchCity = response.name;
            $("h2").text(searchCity + " ");
            $("h2").append("(" + date + ")");
            console.log(date);
            var cityTemp = response.main.temp;
            var cityHumidity = response.main.humidity;
            var cityWind = response.wind.speed;
            // var queryUrl2 = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat="+ cityLat + "&" + "&lon=" + cityLong + "&appid=" +  apiKey;
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
                });
            }

            function fiveDay() {
                var queryUrl3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

                $.ajax({
                    url: queryUrl3,
                    method: "GET"
                }).then(function (res2) {
                    console.log(res2);
                    var fiveDayEl= $("<div>").text("5 Day Forecast").addClass("py-4 forecast");
                    $(".col-md-9").append(fiveDayEl);
                    var deckEl = $("<div>").addClass("card-deck");
                    fiveDayEl.append(deckEl);
                    var date1 = moment().add(1, 'days').calendar();
                    var temp1= res2.list[0].main.temp;
                    var humid1 = res2.list[0].main.humidity;
                    var icon1 = res2.list[0].weather[0].id;
                    var card1 = $("<div>").addClass("card");
                    var cardBody1=$("<div>").addClass("card-body");
                    var cardText1 = $("<h5>").addClass("card-title mt-0");
                    var cardTemp1 = $("<p>").addClass("card-text pb-2");
                    var cardHumid1 = $("<p>").addClass("card-text pb-2");
                    var cardIcon1 = $("<p>").addClass("card-text");
                    cardIcon1.text(icon1);
                    cardTemp1.text(temp1);
                    cardText1.text(date1);
                    cardHumid1.text(humid1);
                    
                    
                    if(icon1 ||icon2 === 800){
                        var iconEl1 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                        cardIcon1.text(iconEl1);
                        card1.append(cardText1,"Temp: ", cardTemp1, "Humidity: ", humid1, "%", iconEl1);
                        
                        deckEl.append(card1);
                        


                    }
                    var date2 = moment().add(2, 'days').calendar();
                    var temp2= res2.list[7].main.temp;
                    var humid2 = res2.list[7].main.humidity;
                    var icon2 = res2.list[7].weather[0].id;
                    var card2 = $("<div>").addClass("card");
                    var cardBody2=$("<div>").addClass("card-body");
                    var cardText2 = $("<h5>").addClass("card-title mt-0");
                    var cardTemp2 = $("<p>").addClass("card-text pb-2");
                    var cardHumid2 = $("<p>").addClass("card-text pb-2");
                    var cardIcon2 = $("<p>").addClass("card-text");
                    cardIcon2.text(icon2);
                    cardTemp2.text(temp2);
                    cardText2.text(date2);
                    cardHumid2.text(humid2);
                    
                    
                    if(icon2 === 800){
                        var iconEl2 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                        cardIcon2.text(iconEl2);
                        card2.append(cardText2,"Temp: ", cardTemp2, "Humidity: ", humid2, "%", iconEl2);
                        
                        deckEl.append(card2);
                        



                    }

                    var date3 = moment().add(3, 'days').calendar();
                    var temp3= res2.list[15].main.temp;
                    var humid3 = res2.list[15].main.humidity;
                    var icon3 = res2.list[15].weather[0].id;
                    var card3 = $("<div>").addClass("card");
                    var cardBody3=$("<div>").addClass("card-body");
                    var cardText3 = $("<h5>").addClass("card-title mt-0");
                    var cardTemp3 = $("<p>").addClass("card-text pb-2");
                    var cardHumid3 = $("<p>").addClass("card-text pb-2");
                    var cardIcon3 = $("<p>").addClass("card-text");
                    cardIcon3.text(icon3);
                    cardTemp3.text(temp3);
                    cardText3.text(date3);
                    cardHumid3.text(humid3);
                    
                    
                    if(icon3 === 800){
                        var iconEl3 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                        cardIcon3.text(iconEl3);
                        card3.append(cardText3,"Temp: ", cardTemp3, "Humidity: ", humid3, "%", iconEl3);
                        
                        deckEl.append(card3);
                        



                    }

                    var date4 = moment().add(4, 'days').calendar();
                    var temp4= res2.list[22].main.temp;
                    var humid4 = res2.list[22].main.humidity;
                    var icon4 = res2.list[22].weather[0].id;
                    var card4 = $("<div>").addClass("card");
                    var cardBody4=$("<div>").addClass("card-body");
                    var cardText4 = $("<h5>").addClass("card-title mt-0");
                    var cardTemp4 = $("<p>").addClass("card-text pb-2");
                    var cardHumid4 = $("<p>").addClass("card-text pb-2");
                    var cardIcon4 = $("<p>").addClass("card-text");
                    cardIcon4.text(icon4);
                    cardTemp4.text(temp4);
                    cardText4.text(date4);
                    cardHumid4.text(humid4);
                    
                    
                    if(icon4 === 800){
                        var iconEl4 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                        cardIcon4.text(iconEl4);
                        card4.append(cardText4,"Temp: ", cardTemp4, "Humidity: ", humid4, "%", iconEl4);
                        
                        deckEl.append(card4);
                        



                    }

                    var date5 = moment().add(5, 'days').calendar();
                    var temp5= res2.list[30].main.temp;
                    var humid5 = res2.list[30].main.humidity;
                    var icon5 = res2.list[30].weather[0].id;
                    var card5 = $("<div>").addClass("card");
                    var cardBody5=$("<div>").addClass("card-body");
                    var cardText5 = $("<h5>").addClass("card-title mt-0");
                    var cardTemp5 = $("<p>").addClass("card-text pb-2");
                    var cardHumid5 = $("<p>").addClass("card-text pb-2");
                    var cardIcon5 = $("<p>").addClass("card-text");
                    cardIcon5.text(icon5);
                    cardTemp5.text(temp5);
                    cardText5.text(date5);
                    cardHumid5.text(humid5);
                    
                    
                    if(icon5 === 800){
                        var iconEl5 = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d@2x.png").addClass("weather-image");

                        cardIcon5.text(iconEl5);
                        card5.append(cardText5,"Temp: ", cardTemp5, "Humidity: ", humid5, "%", iconEl5);
                        
                        deckEl.append(card5);
                        



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

    
});

