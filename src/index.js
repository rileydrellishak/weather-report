const proxyServerURL = 'https://ada-weather-report-proxy-server.onrender.com';

const findLatAndLon = (cityName) => {
  let lat, lon;
  return axios.get(proxyServerURL + '/location', {params: {q: cityName}})
    .then( (response) => {
      lat = response.data[0].lat;
      lon = response.data[0].lon;
      console.log('success in findLatitudeAndLongitude!', lat, lon);
      console.log({lat, lon});
      return {lat, lon};
    })
    .catch( (error) => {
      console.log(`${error}`);
    });
};

const getWeatherFromLatAndLon = (latitude, longitude) => {
  let temp;
  return axios.get(proxyServerURL + '/weather', {params: {lat: latitude, lon: longitude}})
    .then( (response) => {
      let tempValue = document.querySelector('#tempValue');
      temp = response.data.main.temp;
      console.log(convertKelvinToFahrenheit(temp));
      state.tempNum = convertKelvinToFahrenheit(temp);
      colorTempValue(state.tempNum);
      landscapeTempValue(state.tempNum);
      tempValue.textContent = `${state.tempNum}`;
      return convertKelvinToFahrenheit(temp);
    })
    .catch( (error) => {
      console.log(`${error}`);
    });
};

const getWeatherFromCityName = () => {
  findLatAndLon(state.cityName)
    .then((response) => {
      return getWeatherFromLatAndLon(response.lat, response.lon);
    })
    .catch((error) => {
      console.log(`${error}`);
    });
};

const state = {
  tempNum: 72,
  tempValue: null,
  tempColor: null,
  gardenLandscape: null,
  gardenLandscapeText: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  gardenSkyElement: null,
  gardenSkyText: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  gardenContainer: null,
  headerCityName: null,
  cityName: 'Seattle'
};

const colorTempValue = (tempNum) => {
  let tempValue = document.querySelector('#tempValue');
  let currentColor = tempValue.classList;
  if (tempNum >= 80) {
    tempValue.classList.replace(currentColor, 'red');
  } else if (tempNum <= 49) {
    tempValue.classList.replace(currentColor, 'teal');
  } else if (tempNum <= 59) {
    tempValue.classList.replace(currentColor, 'green');
  } else if (tempNum <= 69) {
    tempValue.classList.replace(currentColor, 'yellow');
  } else if (tempNum <= 79) {
    tempValue.classList.replace(currentColor, 'orange');
  }
};

const landscapeRangesAndValues = {
  cold: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲',
  mild: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃',
  nice: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷',
  hot: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
};

const landscapeTempValue = (tempNum) => {
  if (tempNum <= 59) {
    state.gardenLandscape.textContent = landscapeRangesAndValues.cold;
  } else if (tempNum <= 69) {
    state.gardenLandscape.textContent = landscapeRangesAndValues.mild;
  } else if (tempNum <= 79) {
    state.gardenLandscape.textContent = landscapeRangesAndValues.nice;
  } else {
    state.gardenLandscape.textContent = landscapeRangesAndValues.hot;
  }
};

const increaseTemp = () => {
  let tempValue = document.querySelector('#tempValue');
  state.tempNum += 1;
  tempValue.textContent = `${state.tempNum}`;
  colorTempValue(state.tempNum);
  landscapeTempValue(state.tempNum);
};

const decreaseTemp = () => {
  let tempValue = document.querySelector('#tempValue');
  state.tempNum -= 1;
  tempValue.textContent = `${state.tempNum}`;
  colorTempValue(state.tempNum);
  landscapeTempValue(state.tempNum);
};

const convertKelvinToFahrenheit = (temp) => {
  return ((temp - 273.15) * (9 / 5) + 32);
};

const skyColorsAndValues = {
  sunny: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️',
  rainy: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  snowy: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  cloudy: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️'
};

const changeSky = () => {
  let dropdownElement = document.getElementById('skySelect');
  let currentSkyColor = state.gardenContainer.classList[1];
  state.gardenSkyElement.textContent = skyColorsAndValues[dropdownElement.value.toLowerCase()];
  state.gardenContainer.classList.replace(currentSkyColor, dropdownElement.value.toLowerCase());
};

const updateCityName = (event) => {
  let currentText = document.querySelector('#cityNameInput').value;
  let cityHeader = document.querySelector('#headerCityName');
  state.cityName = currentText;
  cityHeader.textContent = `${state.cityName}`;
};

const resetCityNameButton = (event) => {
  let cityHeader = document.querySelector('#headerCityName');
  let currentText = document.querySelector('#cityNameInput');
  state.cityName = 'Seattle';
  cityHeader.textContent = `${state.cityName}`;
  currentText.value = state.cityName;
};

const registerEventHandlers = () => {
  const increaseTempControl = document.querySelector('#increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);

  const decreaseTempControl = document.querySelector('#decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);

  const changeSkyControl = document.querySelector('#skySelect');
  changeSkyControl.addEventListener('change', changeSky);

  const cityText = document.querySelector('#cityNameInput');
  cityText.addEventListener('keyup', updateCityName);

  const resetCity = document.querySelector('#cityNameReset');
  resetCity.addEventListener('click', resetCityNameButton);

  const getCurrentTemp = document.querySelector('#currentTempButton');
  getCurrentTemp.addEventListener('click', getWeatherFromCityName);
};

const loadControls = () => {
  state.tempValue = document.getElementById('tempValue');
  state.tempValue.textContent = state.tempNum;
  state.tempValue.classList.add('orange');

  state.gardenLandscape = document.getElementById('landscape');
  state.gardenLandscape.textContent = state.gardenLandscapeText;

  state.gardenSkyElement = document.getElementById('sky');
  state.gardenSkyElement.textContent = state.gardenSkyText;

  state.gardenContainer = document.getElementById('gardenContent');
  state.gardenContainer.classList.add('sunny');

  state.headerCityName = document.getElementById('headerCityName');
  state.headerCityName.textContent = state.cityName;
};

const onLoaded = () => {
  loadControls();
  registerEventHandlers();
};

onLoaded();