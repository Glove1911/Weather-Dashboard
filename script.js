$(document).ready(function () {
    
    function renderCities(){
    var cities =JSON.parse(localStorage.getItem("cities"));
    // var cities = ["Dallas"];
    if (cities){
        var citiesEl= $("#cities")
        for(var i = 0; i < cities.length; i++){
           var cityEl= $("<div>").attr("id","city-"+i).text(cities[i])
           citiesEl.append(cityEl);

        }
        
    }
    }
    function citySearch() {
        var cityName = $("#city-name").val().trim();
        var apiKey = "783997aa107a158f59a5294fd9806517";
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
        console.log(queryUrl);
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
        localStorage.setItem("cities",cityName);
        renderCities();
    }
    // citySearch();
    $(".search").on("click", function (event) {
        event.preventDefault();
        citySearch();
       
    });

// renderCities();
});
// renderCities();
