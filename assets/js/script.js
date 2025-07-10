let weatherCard = document.querySelector(".main-sec .row");

let searchBtn = document.getElementById("find-btn");
let searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", function () {
  getWeather(searchInput.value);
});

searchBtn.addEventListener("click", function () {
  getCurrentWeather(searchInput.value);
  getNextWeather(searchInput.value);
  getNextTomorrowWeather(searchInput.value);
});

let ApiKey = "c0327603fd9147c3a72185508251007";

async function getWeather(city) {
  data = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=3`
  );

  const response = await data.json();

  const cityName = response.location.name;

  const currentTemp = response.forecast.forecastday[0].day.maxtemp_c;
  const currentCondition = response.current.condition.text;

  const nextTempMax = response.forecast.forecastday[1].day.maxtemp_c;
  const nextTempMin = response.forecast.forecastday[1].day.mintemp_c;
  const nextCondition = response.forecast.forecastday[1].day.condition.text;

  const nextNextTempMax = response.forecast.forecastday[2].day.maxtemp_c;
  const nextNextTempMin = response.forecast.forecastday[2].day.mintemp_c;
  const nextNextCondition = response.forecast.forecastday[2].day.condition.text;

  const wind = response.current.wind_mph;
  let windDir = response.current.wind_dir;
  windDir = getWindDirection(windDir);
  const chanceOfRain =
    response.forecast.forecastday[0].day.daily_chance_of_rain;

  const date = new Date(response.location.localtime);
  const day1Name = new Date(
    response.forecast.forecastday[0].date
  ).toLocaleDateString("en-US", { weekday: "long" });
  const day2Name = new Date(
    response.forecast.forecastday[1].date
  ).toLocaleDateString("en-US", { weekday: "long" });
  const day3Name = new Date(
    response.forecast.forecastday[2].date
  ).toLocaleDateString("en-US", { weekday: "long" });

  const dayNum = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });

  const weatherWrapper = `
    <div class="col-md-4">
      <div class="first-card cardd h-100">
        <div
          class="date d-flex justify-content-between align-items-center px-3 py-2 "
        >
          <p class="mb-0">${day1Name}</p>
          <p class="mb-0">${dayNum} ${month}</p>
        </div>
        <div class="main-content px-3">
          <p class="mb-0 location-name">${cityName}</p>
          <p class="temperature">${currentTemp}°C</p>
          <p class="condition">${currentCondition}</p>
          <i class="fa-solid fa-sun mb-4"></i>
          <ul class="list-unstyled d-flex gap-4">
            <li class="d-flex align-items-center gap-2">
              <i class="fa-solid fa-umbrella"></i>
              <p class="mb-0">${chanceOfRain}%</p>
            </li>
            <li class="d-flex align-items-center gap-2">
              <i class="fa-solid fa-wind"></i>
              <p class="mb-0">${wind} km/h</p>
            </li>
            <li class="d-flex align-items-center gap-2">
              <i class="fa-solid fa-compass"></i>
              <p class="mb-0">${windDir}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="second-card cardd h-100">
        <div class="date d-flex justify-content-center px-3 py-2 ">
          <p class="mb-0">${day2Name}</p>
        </div>
        <div class="main-content px-3">
          <i class="fa-solid fa-sun mb-4"></i>
          <p class="temperature">${nextTempMax} °C</p>
          <p class="temperature2 mb-5">${nextTempMin} °C</p>
          <p class="condition">${nextCondition}</p>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="third-card cardd h-100">
        <div class="date d-flex justify-content-center px-3 py-2 ">
          <p class="mb-0">${day3Name}</p>
        </div>
        <div class="main-content px-3">
          <i class="fa-solid fa-sun mb-4"></i>
          <p class="temperature">${nextNextTempMax} °C</p>
          <p class="temperature2 mb-5">${nextNextTempMin} °C</p>
          <p class="condition">${nextNextCondition}</p>
        </div>
      </div>
    </div>
  `;

  weatherCard.innerHTML = weatherWrapper;
}

function getWindDirection(windDir) {
  if (windDir === "N") {
    windDir = "North";
  } else if (windDir === "S") {
    windDir = "South";
  } else if (windDir === "E") {
    windDir = "East";
  } else if (windDir === "W") {
    windDir = "West";
  } else {
    return windDir;
  }
  return windDir;
}
