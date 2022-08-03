var searchFormEl = document.querySelector('#cityForm'); //Variable for the entire form div
var cityInputEl = document.querySelector("#cityName"); //Variable for the input
var currentDayEl = document.querySelector("#currentDay"); //Current Day Section
var cityHistory = document.querySelector("#cityHistory"); //On the left tha holds the history of cities searched
var cityTitle = document.querySelector("#city");
var rightC = document.querySelector("#rightC");

var getCity = function(event){
    event.preventDefault();
    var cityNameL = cityName.value;
    cityTitle.textContent = cityNameL;
    localStorageCity(cityNameL);
    fetchData(cityNameL);
}

var localStorageCity = function(city){
    var currentCity = document.createElement("h5");
    currentCity.classList.add("bg-secondary", "col-12", "text-center", "rounded", "text-white");
    currentCity.textContent = city;
    cityHistory.append(currentCity);

}

var fetchData = function(city){
    var cityL = city.toLowerCase();
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityL + "&appid=467e939d60d52caa89278909c936ae43";
    
    fetch(weatherUrl).then(function(response){
        if (response){
            return response.json()
            .then(function(data){
                //display in HTML here

                console.log(JSON.parse('data.list[0].weather.icon'));
                dayD(data.list[0]);
                dayD(data.list[8]);
                dayD(data.list[15]);
                dayD(data.list[22]);
                dayD(data.list[30]);
            })
        } else {
            alert("Something went wrong. Please try again");
        }
    })
}



var convertDate = function(unix){
    var realDate = new Date(unix * 1000);
    year = realDate.getFullYear();
    month = realDate.getMonth() + 1;
    dt = realDate.getDate();
    return year + "-" + month + "-" + dt;
}

var dayD = function(data){

    var date = convertDate(data.dt);
    var temp = Math.round(1.8*(data.main.temp-273) + 32);
    var hum = data.main.humidity;
    var wind = data.wind.speed;
    // var icon = JSON.stringify(data.weather.icon);
    // console.log(icon);

    // var cardImage = document.createElement("img");
    // cardImage.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    // cardBody.append(cardImage);

    var cardEl = document.createElement("div");
    cardEl.classList.add("card", "border-top", "mb3");
    var cardBody = document.createElement("div");

    var cardTitle = document.createElement("h5");
    cardTitle.textContent = date;
    cardBody.append(cardTitle);

    var cardTemp = document.createElement("h6");
    cardTemp.textContent = "Temp: " + temp + " F";
    cardBody.append(cardTemp);

    var cardHum = document.createElement("h6");
    cardHum.textContent = "Humid: " + hum + " %";
    cardBody.append(cardHum);

    var cardWind = document.createElement("h6");
    cardWind.textContent = "Wind: " + wind + " MPH";
    cardBody.append(cardWind);
    
    cardBody.classList.add("cardBody");
    cardEl.append(cardBody);
    cardEl.style = "width:18rem"
    rightC.append(cardEl);
    
}

var removeElements = function(){
    rightC.parentNode.removeChild(rightC);
}

// searchFormEl.addEventListener('submit',removeElements);
searchFormEl.addEventListener('submit',getCity);