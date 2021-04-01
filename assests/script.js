var API = "64bc4cd6e200b918a1352379f5adccf3"
$("#weather-forecast").on("click", function(){
    var cityName=$("#city-name").val()
    console.log(cityName)
    currentWeather(cityName)
})
function currentWeather(cityName) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}`,
        method:"GET",
        success: function( result ) {
            console.log(result)
        //   $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
        }
      });  
}