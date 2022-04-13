//show forecast and wind

async function getGeoLoc(location) {
  if (!location) {
    city = 'Kretinga';
  } else {
    city = location;
  }
  let fetchStr =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    city +
    '&limit=5&appid=c9d89fbef52f80c829fd4a44946773c3';

  let response = await fetch(fetchStr, {
    mode: 'cors',
  });
  data = await response.json();
  return data;
}

async function getWeatherData(lat, lon, geoApiLocName) {
  let fetchStr =
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    lat +
    '&lon=' +
    lon +
    '&units=metric&appid=c9d89fbef52f80c829fd4a44946773c3';

  let response = await fetch(fetchStr, {
    mode: 'cors',
  });
  data = await response.json();
  console.log(data);
  domWeatherCard(
    geoApiLocName,
    data.weather[0].description,
    data.main.temp,
    data.main.feels_like,
    data.weather[0].icon
  );
  console.log(
    'Weather in ' +
      data.name +
      ', ' +
      data.weather[0].description +
      ', temperature is ' +
      data.main.temp +
      ', feels like ' +
      data.main.feels_like +
      ', wind is ' +
      data.wind.speed +
      ' m/s'
  );
}
async function mainProcess(locationStr) {
  let geoLoc = await getGeoLoc(locationStr);
  // getWeatherData(geoLoc[0].lat, geoLoc[0].lon, geoLoc[0].name);

  getWeatherForecastData(geoLoc[0].lat, geoLoc[0].lon, geoLoc[0].name);
}

function domWeatherCard(geoNameText, descriptionText, tempText, feelsLikeText) {
  //check if weather card already exists and delete it if so
  if (document.querySelector('.weatherCard')) {
    document.querySelector('.weatherCard').remove();
  }
  let cardsContainer = document.querySelector('.weatherCardsContainer');
  let weatherCard = document.createElement('div');
  let geoNameContainer = document.createElement('div');
  let geoName = document.createElement('div');
  let description = document.createElement('div');
  let tempContainer = document.createElement('div');
  let leftSide = document.createElement('div');
  let rightSide = document.createElement('div');
  let weatherIcon = document.createElement('img');
  let temp = document.createElement('div');
  let feelsLikeTemp = document.createElement('div');

  weatherCard.classList.add('weatherCard');
  geoNameContainer.classList.add('geoNameContainer');
  geoName.classList.add('geoName');
  geoName.textContent = geoNameText;
  description.classList.add('description');
  descriptionText =
    descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
  description.textContent = descriptionText;
  tempContainer.classList.add('tempContainer');
  rightSide.classList.add('rightSide');
  weatherIcon.src =
    'http://openweathermap.org/img/wn/' +
    data.current.weather[0].icon +
    '@2x.png';
  temp.classList.add('temp');
  temp.textContent = tempText.toFixed(1) + '°';
  feelsLikeTemp.classList.add('feelsLike');
  feelsLikeTemp.textContent = 'Feels like ' + feelsLikeText.toFixed(1) + '°';

  cardsContainer.appendChild(weatherCard);
  weatherCard.appendChild(geoNameContainer);
  geoNameContainer.appendChild(geoName);
  geoNameContainer.appendChild(weatherIcon);
  weatherCard.appendChild(tempContainer);
  tempContainer.appendChild(leftSide);
  tempContainer.appendChild(rightSide);
  leftSide.appendChild(temp);
  rightSide.appendChild(description);
  rightSide.appendChild(feelsLikeTemp);
}
(function attachEventListeners() {
  function getInputValueNClear() {
    let inputValue = document.querySelector('#locInput').value;
    document.querySelector('#locInput').value = '';
    mainProcess(inputValue);
  }
  let locationInputBtn = document.querySelector('#locSearchBtn');
  locationInputBtn.addEventListener('click', () => {
    getInputValueNClear();
  });
  let locationInput = document.querySelector('#locInput');
  locationInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      getInputValueNClear();
    }
  });
})();

async function getWeatherForecastData(lat, lon, geoApiLocName) {
  let fetchStr =
    'https://api.openweathermap.org/data/2.5/onecall?lat=' +
    lat +
    '&lon=' +
    lon +
    '&units=metric&appid=c9d89fbef52f80c829fd4a44946773c3';

  let response = await fetch(fetchStr, {
    mode: 'cors',
  });
  data = await response.json();
  console.log(data);
  domWeatherCard(
    geoApiLocName,
    data.current.weather[0].description,
    data.current.temp,
    data.current.feels_like,
    data.current.weather[0].icon
  );
  console.log(
    'Weather in ' +
      geoApiLocName +
      ', ' +
      data.current.weather[0].description +
      ', temperature is ' +
      data.current.temp +
      ', feels like ' +
      data.current.feels_like +
      ', wind is ' +
      data.current.wind_speed +
      ' m/s'
  );
}

mainProcess();
