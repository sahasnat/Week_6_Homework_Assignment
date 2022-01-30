var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector("#search-input");
var searchList = document.querySelector("#search-list");
var searchCountSpan = document.querySelector("#search-count");

var searchs = [];

// The following function renders items in a search list as <li> elements
function rendersearchs() {
  // Clear searchList element and update searchCountSpan
  searchList.innerHTML = "";
  searchCountSpan.textContent = searchs.length;

  // Render a new li for each search
  for (var i = 0; i < searchs.length; i++) {
    var search = searchs[i];

    var li = document.createElement("li");
    li.classList.add("liStyle");
    li.textContent = search;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Remove";

    li.appendChild(button);
    searchList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored searchs from localStorage
  var storedsearchs = JSON.parse(localStorage.getItem("searchs"));

  // If searchs were retrieved from localStorage, update the searchs array to it
  if (storedsearchs !== null) {
    searchs = storedsearchs;
  }

  // This is a helper function that will render searchs to the DOM
  rendersearchs();
}

function storesearchs() {
  // Stringify and set key in localStorage to searchs array
  localStorage.setItem("searchs", JSON.stringify(searchs));
}

// Add submit event to form
searchForm.addEventListener("click", function(event) {
  event.preventDefault();

  var searchText = searchInput.value.trim();

  // Return from function early if submitted searchText is blank
  if (searchText === "") {
    return;
  }

  // Add new searchText to searchs array, clear the input
  searchs.push(searchText);
  searchInput.value = "";

  // Store updated searchs in localStorage, re-render the list
  storesearchs();
  rendersearchs();
});

// Add click event to searchList element
searchList.addEventListener("click", function(event) {
  var element = event.target;

  // Checks if element is a button
  if (element.matches("button") === true) {
    // Get its data-index value and remove the search element from the list
    var index = element.parentElement.getAttribute("data-index");
    searchs.splice(index, 1);

    // Store updated searchs in localStorage, re-render the list
    storesearchs();
    rendersearchs();
  }
});

// Calls init to retrieve data and render it to the page on load
init();


//when user types in search field local storage saves it for listing purposes but all display weather snippets.
 var searchBtn = document.querySelector('.searchBtn');
 
 //APIKey to call on for later
 var APIKey="&appid=bf474095bde17feb5b9749d6390270e7";
 var limit = "&limit=1";
 //current container variables
 var cityNameEl = document.querySelector('.name');
 var currentDate = document.querySelector('.currentdate');
 var descEl = document.querySelector('.desc');
 var wiconEl = document.querySelector('.wicon');
 var tempEl= document.querySelector('.temp');
 var uvIndexEl = document.querySelector('.uvIndex');
 var windEl = document.querySelector('.wind');
 var humidityEl = document.querySelector('.humidity');
 
 //future container variables
 //Day 1
 var day1date = document.querySelector('.futuredate1');
 var day1futuretempEl= document.querySelector(".futuretemp1");
 var day1futurewindEl = document.querySelector(".futurewind1");
 var day1futurehumidityEl = document.querySelector(".futurehumidity1");
 //Day2
 var day2date = document.querySelector('.futuredate2');
 var day2futuretempEl= document.querySelector(".futuretemp2");
 var day2futurewindEl = document.querySelector(".futurewind2");
 var day2futurehumidityEl = document.querySelector(".futurehumidity2");
 //Day 3
 var day3date = document.querySelector('.futuredate3');
 var day3futuretempEl = document.querySelector(".futuretemp3");
 var day3futurewindEl = document.querySelector(".futurewind3");
 var day3futurehumidityEl = document.querySelector(".futurehumidity3");
 //Day 4
 var day4date = document.querySelector('.futuredate4');
 var day4futuretempEl = document.querySelector(".futuretemp4");
 var day4futurewindEl = document.querySelector(".futurewind4");
 var day4futurehumidityEl = document.querySelector(".futurehumidity4");
 //Day 5
 var day5date = document.querySelector('.futuredate5');
 var day5futuretempEl = document.querySelector(".futuretemp5");
 var day5futurewindEl = document.querySelector(".futurewind5");
 var day5futurehumidityEl = document.querySelector(".futurehumidity5");




  //populate weather Information

  function populateWeather(event) {
  event.preventDefault();

  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' +searchInput.value +limit +APIKey)
  .then(response => response.json())
  // .then(data => console.log (data))
  .then(data => {
    var Lat = data[0]['lat'].toFixed(2);
    var Lon= data[0]['lon'].toFixed(2);
    console.log(Lat);
    console.log(Lon);


  fetch('http://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&lon='+Lon+APIKey)
  .then(response => response.json())
  // .then(data => console.log (data))
  .then(data => {
    var UVI = data['current']['uvi'];
    var Wicon= data['current']['weather'][0]['icon'];
    console.log(UVI);
    console.log(Wicon);

    uvIndexEl.innerHTML = "UV Index: " + UVI;
    wiconEl.innerHTML = "Weather Icon: " + Wicon;

})

})
  fetch('http://api.openweathermap.org/data/2.5/weather?q='+searchInput.value+ APIKey)
  .then(response => response.json())
  // .then(data => console.log (data))
  .then(data => {
      var nameValue = data ['name'];
      var descValue = data ['weather'][0]['description'];
      var currentDay = new Date()
      var readable_date = new Date(currentDay).toDateString();
      var tempValue = data ['main']['temp'];
      var windValue = data ['wind']['speed'];
      var humidityValue = data  ['main']['humidity'];

      currentDate.innerHTML=readable_date;
      cityNameEl.innerHTML=nameValue ;
      descEl.innerHTML= "Weather Description: " + descValue;
      tempEl.innerHTML="Temp: " + tempValue  + "F";
      windEl.innerHTML= "Wind: " + windValue + "MPH";
      humidityEl.innerHTML= "Humidity: " + humidityValue + "%";

      
      })
      
  fetch('http://api.openweathermap.org/data/2.5/forecast?q='+searchInput.value+ APIKey)
      .then(response => response.json())
      // .then(data => console.log (data))
      .then(data => {
          //data attribute for furture forecast
          var day1futureDate = data ['list'][2]['dt_txt'];
          var readable_date1 = new Date(day1futureDate).toDateString();
          var day1futuretempValue = data ['list'][2]['main']['temp'];
          var day1futurewindValue = data ['list'][2]['wind']['speed'];
          var day1futurehumidityValue = data ['list'][2]['main']['humidity'];
          // var day1futuredescValue = data ['list'][0]['weather'][0]['description'];

          day1date.innerHTML=readable_date1;
          day1futuretempEl.innerHTML="Temp: " + day1futuretempValue + "F";
          day1futurewindEl.innerHTML="Wind: " + day1futurewindValue + "MPH";
          day1futurehumidityEl.innerHTML="Humidity: " +day1futurehumidityValue + "%";
          // day1futuredescEl.innerHTML=day1futuredescValue;


          var day2futureDate = data ['list'][10]['dt_txt'];
          var readable_date2 = new Date(day2futureDate).toDateString();
          var day2futuretempValue = data ['list'][10]['main']['temp'];
          var day2futurewindValue = data ['list'][10]['wind']['speed'];
          var day2futurehumidityValue = data ['list'][10]['main']['humidity'];
          // var day2futuredescValue = data ['list'][1]['weather'][0]['description'];


          day2date.innerHTML=readable_date2;
          day2futuretempEl.innerHTML="Temp: " +day2futuretempValue + "F";
          day2futurewindEl.innerHTML="Wind: " + day2futurewindValue + "MPH";
          day2futurehumidityEl.innerHTML="Humidity: " + day2futurehumidityValue + "%";
          // day2futuredescEl.innerHTML=day2futuredescValue;

          var day3futureDate = data ['list'][18]['dt_txt'];
          var readable_date3 = new Date(day3futureDate).toDateString();
          var day3futuretempValue = data ['list'][18]['main']['temp'];
          var day3futurewindValue = data ['list'][18]['wind']['speed'];
          var day3futurehumidityValue = data ['list'][18]['main']['humidity'] ;
          // var day3futuredescValue = data ['list'][1]['weather'][0]['description'];


          day3date.innerHTML=readable_date3;
          day3futuretempEl.innerHTML="Temp: " +day3futuretempValue + "F";
          day3futurewindEl.innerHTML="Wind: " + day3futurewindValue + "MPH";
          day3futurehumidityEl.innerHTML="Humidity: " + day3futurehumidityValue + "%";
          // day3futuredescEl.innerHTML=day3futuredescValue;


          var day4futureDate = data ['list'][26]['dt_txt'];
          var readable_date4 = new Date(day4futureDate).toDateString();
          var day4futuretempValue = data ['list'][26]['main']['temp'];
          var day4futurewindValue = data ['list'][26]['wind']['speed'];
          var day4futurehumidityValue = data ['list'][26]['main']['humidity'];
         // var day4futuredescValue = data ['list'][1]['weather'][0]['description'];

          day4date.innerHTML=readable_date4;
          day4futuretempEl.innerHTML="Temp: " +day4futuretempValue + "F";
          day4futurewindEl.innerHTML="Wind: " + day4futurewindValue + "MPH";
          day4futurehumidityEl.innerHTML="Humidity: " + day4futurehumidityValue + "%";
          // day4futuredescEl.innerHTML=day3futuredescValue;

          var day5futureDate = data ['list'][34]['dt_txt'];
          var readable_date5 = new Date(day5futureDate).toDateString();
          var day5futuretempValue = data ['list'][34]['main']['temp'];
          var day5futurewindValue = data ['list'][34]['wind']['speed'];
          var day5futurehumidityValue = data ['list'][34]['main']['humidity'];
          // var day5futuredescValue = data ['list'][1]['weather'][0]['description'];

          day5date.innerHTML=readable_date5;
          day5futuretempEl.innerHTML="Temp: " +day5futuretempValue + "F";
          day5futurewindEl.innerHTML="Wind: " + day5futurewindValue + "MPH";
          day5futurehumidityEl.innerHTML="Humidity: " + day5futurehumidityValue + "%";
          // day5futuredescEl.innerHTML=day3futuredescValue;

      })

  .catch(err => alert("City Name undefined"))
 }

 //when the searchbutton is click the current weather will be listed and the future forecast
searchBtn.addEventListener('click', populateWeather);

