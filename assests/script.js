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
            $("#current-weather").html(`<h3>City Name:${cityName}</h3>
            
         <p>Current Weather: <strong>${result.main.temp}</strong> degrees<p>
         <p>Humidity: ${result.main.humidity} <i>%</i></p>
         <p>Description: ${result.weather[0].description} <p>
         <img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" />
         Wind Speed: ${result.wind.speed}`);
         var lat = result.coord.lat
         var lon = result.coord.lon
         getUV(lat,lon)
         getLocalStorage(cityName)
        }
    });
}



function fiveDayForecast(cityName){
    var endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API}&units=imperial`;
           fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            // Invoke our history method
            // if (!existingHistory.includes(searchValue)) {
            //   handleHistory(searchValue);
            i = 0
            console.log(data.list)
            var htmlCode = ""
            for(let i=0;i<data.list.length;i=i+8){
              htmlCode += `<div class="card col-lg-2 flex-box border-primary"> <br>
            <p>Date: <strong>${data.list[i].dt_txt}</strong><p>
            <p>Temperature: <strong>${data.list[i].main.temp}</strong> degrees<p>
            <p>Humidity: <strong>${data.list[i].main.humidity}</strong> % </p>
            <p>Description: ${data.list[i].weather[0].description}<p>
            <p>Wind Speed: ${data.list[i].wind.speed}</p>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" />
            
            </div>`
            }
            $("#forecastFor5Days").html(htmlCode)

        });  
        
}

        function getUV(lat,lon){
          var endpoint = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API}`
            fetch(endpoint)
         .then((res) => res.json())
         .then((data) => {
             
             i = 0
             console.log(data)
             $("#uv-index").html(`<h6>UV: ${data.value}</h6>`)
        })
    }


function getLocalStorage(cityName){
    var search = JSON.parse(localStorage.getItem("Weather")) || []
    search.push(cityName)
    localStorage.setItem("Weather", JSON.stringify(search))
   console.log("Local",search)
   var htmlCode = ""
   for(let i =0;i<search.length;i++){
       htmlCode += `<li> ${search[i]} </li>`
       if (i  == 20)  {
        localStorage.clear();
     }

   }
   $("#previous").html(htmlCode)
   
}
