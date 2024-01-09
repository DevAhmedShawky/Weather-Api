let searchOfCountry = document.querySelector("#search");
let addLocation = document.querySelector("#location");
let childOfForecast = document.querySelector("#child");
let day = "";
let today = "";
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let showDataOnDocyment = "";
let lat = "";
let lan = "";


addLocation.addEventListener("click", () => {
  getLocation();
});

let dataJason = "";
async function apiData(cun) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=c307755ce7574404ab9202956240401&q=${cun}&days=3`
  );
  dataJason = await data.json();
  dataToday();
}

apiData("Cairo");

// Start For Get The First Day
let forecastToday = document.querySelector(".forecast-today");

function dataToday() {
  let firstDay = new Date(dataJason.forecast.forecastday[0].date);
  showDataOnDocyment = `
  <div class="forecast forecast-today col-lg-4">
  <div class="child">
  <div
    class="forecast-header p-2 text-center d-flex align-items-center justify-content-between"
  >
    <div class="day">${dayNames[firstDay.getDay()]}</div>
    <div class="date">${firstDay.getDate()} ${months[firstDay.getMonth()]}</div>
  </div>
  <div class="forecast-content">
    <div class="location fs-5">${dataJason.location.name}</div>
    <div class="degree d-flex">
      <div class="num fw-bold text-light">
        ${dataJason.current.temp_c}<sup>o</sup>c
      </div>

      <div class="forecast-icon">
        <img
          src="https:${dataJason.current.condition.icon}"
          width="90"
        />
      </div>
    </div>
    <div class="custom mb-3">${dataJason.current.condition.text}</div>
    <span class="me-3"
      ><img
        class="me-1"
        src="img/icon-umberella.png"
        alt=""
      />${dataJason.current.humidity}%</span
    >
    <span class="me-3"
      ><img
        class="me-1"
        src="img/icon-wind.png"
        alt=""
      />${dataJason.current.wind_kph}m/k</span
    >
    <span class="me-3"
      ><img
        class="me-1"
        src="img/icon-compass.png"
        alt=""
      />${dataJason.current.wind_dir}</span
    >
  </div>
  </div>
</div>
        `;

  for (let i = 1; i < dataJason.forecast.forecastday.length; i++) {
    day = new Date(dataJason.forecast.forecastday[i].date);
    today = day.getDay();

    showDataOnDocyment += `
    <div class="forecast col-lg-4">
    <div class="child h-100">
    <div class="forecast-header text-center p-2">
      <div class="day">${dayNames[today]}</div>
    </div>
    <div class="forecast-content text-center">
      <div class="forecast-icon mb-3">
        <img
          src="https:${dataJason.forecast.forecastday[i].day.condition.icon}"
          alt=""
          width="48"
        />
      </div>
      <div class="degree text-light fw-bold fs-4">
        ${dataJason.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>c
      </div>
      <small class="fs-5"
        >${dataJason.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>c</small
      >
      <div class="custom my-4">
        ${dataJason.forecast.forecastday[i].day.condition.text}
      </div>
    </div>
    </div>
  </div>
      `;
  }

  childOfForecast.innerHTML = showDataOnDocyment;
}

// Start Funcition To Get Location About User
function error() {
  Swal.fire("Unable to retrieve your location!");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, error);
  }
}

let finalResult = "";
function showPosition(position) {
  lat = position.coords.latitude;
  lan = position.coords.longitude;
  finalResult = `${lat},${lan}`;
  apiData(finalResult);
}

// End Funcition To Get Location About User

// Validaton for input Search
function validateName() {
  let nameRejx = /^[a-z]/;
  if (nameRejx.test(searchOfCountry.value)) {
    apiData(searchOfCountry.value);
    searchOfCountry.value = "";
    return true;
  } else {
    Swal.fire("wirte Such as for E.g");
    return false;
  }
}
searchOfCountry.addEventListener("blur", validateName);
