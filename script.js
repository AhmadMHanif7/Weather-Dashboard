var searchFormEl = document.querySelector('#cityForm'); //Variable for the entire form div
var cityInputEl = document.querySelector("#cityName"); //Variable for the input
var rightCol = document.querySelector("#rightC");
var cityHistory = document.querySelector("#cityHistory");
var currentCityEl = document.querySelector("#currentCity"); //For the current City on the right side

var getCity = function(event){
    event.preventDefault();
    var cityName = cityInputEl.value;
    console.log(cityName);
    currentCityEl.textContent = cityName

    localStorageCity(cityName);
    fetchData(cityName);
}

var localStorageCity = function(city){
    var currentCity = document.createElement("h5");
    currentCity.classList.add("bg-secondary", "col-12", "text-center", "rounded", "text-white");
    currentCity.textContent = city;
    cityHistory.append(currentCity);

}

var fetchData = function(city){
    var cityL = city.toLowerCase();
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityL + "&units=imperial&appid=5f8cb76e4643aabd16435c940ae381b8";
    
    fetch(weatherUrl).then(function(response){
        if (response){
            console.log(response)
        } else {
            alert("Something went wrong. Please try again");
        }
    })
}
searchFormEl.addEventListener('submit',getCity);