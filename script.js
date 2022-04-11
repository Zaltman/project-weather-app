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
  // http://openweathermap.org/img/wn/10d@2x.png
  data = await response.json();
  console.log(data);
  console.log(data.weather[0].icon);
  domWeatherCard(
    data.name,
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
      data.main.feels_like
  );
}
async function mainProcess() {
  let geoLoc = await getGeoLoc();
  getWeatherData(geoLoc[0].lat, geoLoc[0].lon);
}

function domWeatherCard(geoNameText, descriptionText, tempText, feelsLikeText) {
  //check if weather card already exists and delete it if so
  if (document.querySelector('.weatherCard')) {
    document.querySelector('.weatherCard').remove();
  }
  let locationInputBtn = document.querySelector('#locSearchBtn');
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

  locationInputBtn.addEventListener('click', locationBtnClick);

  function locationBtnClick() {
    let inputValue = document.querySelector('#locInput').value;
    console.log(inputValue);
    mainProcess();
  }
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
    'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
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
mainProcess();

// getWeatherData(55.8900579, 21.2424112);

//key  c9d89fbef52f80c829fd4a44946773c3
