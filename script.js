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

async function getWeatherData(lat, lon) {
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
  domWeatherCard(
    data.name,
    data.weather[0].description,
    data.main.temp,
    data.main.feels_like
  );
  console.log(
    'Weather in ' +
      data.name +
      ', ' +
      data.weather[0].description +
      ', temperature is ' +
      data.main.temp +
      ', feels like ' +
      data.main.feels_like
  );
}
async function mainProcess() {
  let geoLoc = await getGeoLoc();
  getWeatherData(geoLoc[0].lat, geoLoc[0].lon);
}
mainProcess();

function domWeatherCard(geoNameText, descriptionText, tempText, feelsLikeText) {
  let cardsContainer = document.querySelector('.weatherCardsContainer');
  let weatherCard = document.createElement('div');
  weatherCard.classList.add('weatherCard');

  let geoName = document.createElement('div');
  geoName.classList.add('geoName');
  geoName.textContent = geoNameText;

  let description = document.createElement('div');
  description.classList.add('description');
  descriptionText =
    descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
  description.textContent = descriptionText;

  let tempContainer = document.createElement('div');
  tempContainer.classList.add('tempContainer');

  let leftSide = document.createElement('div');
  let rightSide = document.createElement('div');
  rightSide.classList.add('rightSide');

  let temp = document.createElement('div');
  temp.classList.add('temp');
  temp.textContent = tempText + '°';

  let feelsLikeTemp = document.createElement('div');
  feelsLikeTemp.classList.add('feelsLike');
  feelsLikeTemp.textContent = 'Feels like ' + feelsLikeText + '°';

  cardsContainer.appendChild(weatherCard);
  weatherCard.appendChild(geoName);
  weatherCard.appendChild(tempContainer);
  tempContainer.appendChild(leftSide);
  tempContainer.appendChild(rightSide);

  leftSide.appendChild(temp);
  rightSide.appendChild(feelsLikeTemp);
  rightSide.appendChild(description);
}

// getWeatherData(55.8900579, 21.2424112);

//key  c9d89fbef52f80c829fd4a44946773c3
