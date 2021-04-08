var API = "64bc4cd6e200b918a1352379f5adccf3"
$("#weather-forecast").on("click", function () {
    var cityName = $("#city-name").val()
    console.log(cityName)
    currentWeather(cityName)
    fiveDayForecast(cityName)
})
function currentWeather(cityName) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=imperial`,
        //       url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=imperial`,
        method: "GET",
        success: function (result) {
            console.log(result)
            $("#current-weather").html(`<h3>City Name:${cityName}</h1>
         <p>Current Weather:<strong>${result.main.temp}</strong> degrees<p>
         <p>Humidity: ${result.main.humidity}</p>
         <p>Description: ${result.weather[0].description}<p>
         <img src="http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" />
         Wind Speed: ${result.wind.speed}`);
        }
    });
}

// searchValue="Houston"

// var url = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API}&units=imperial`;
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         // Invoke our history method
//         // if (!existingHistory.includes(searchValue)) {
//         //   handleHistory(searchValue);
//         console.log(data)
//         }
//       )




function fiveDayForecast(cityName){
    var endpoint = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=imperial`;
        fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            // Invoke our history method
            // if (!existingHistory.includes(searchValue)) {
            //   handleHistory(searchValue);
            i = 0
            console.log(data.list[i])
            $("#forecastFor5Days").html(`<h3>City Name:${cityName}</h1>
        <p>Date: <strong>${data.list[i].dt_txt}</strong> degrees<p>
            <p>Temperature: <strong>${data.list[i].main.temp}</strong> degrees<p>
            <p>Humidity: <strong>${data.list[i].main.humidity}</strong> % </p>
            <p>Description: ${data.list[i].weather[0].description}<p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" />
            Wind Speed: ${data.list[i].wind.speed}`);

        });  
        
}

            


