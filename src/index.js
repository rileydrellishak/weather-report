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

const landscapeTempValue = (tempNum) => {
  if (tempNum <= 59) {
    state.gardenLandscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else if (tempNum <= 69) {
    state.gardenLandscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (tempNum <= 79) {
    state.gardenLandscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else {
    state.gardenLandscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
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

const changeSky = () => {
  let dropdownElement = document.getElementById('skySelect');
  let currentSkyColor = state.gardenContainer.classList[1];
  if (dropdownElement.value === 'Cloudy') {
    state.gardenSkyElement.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    state.gardenContainer.classList.replace(currentSkyColor, 'cloudy');
  } else if (dropdownElement.value === 'Rainy') {
    state.gardenSkyElement.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    state.gardenContainer.classList.replace(currentSkyColor, 'rainy');
  } else if (dropdownElement.value === 'Snowy') {
    state.gardenSkyElement.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    state.gardenContainer.classList.replace(currentSkyColor, 'snowy');
  } else {
    state.gardenSkyElement.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    state.gardenContainer.classList.replace(currentSkyColor, 'sunny');
  }
};
const updateCityName = (event) => {
  let currentText = document.querySelector('#cityNameInput').value;
  let cityHeader = document.querySelector('#headerCityName');
  state.cityName = currentText
  cityHeader.textContent = `${state.cityName}`
}

const registerEventHandlers = () => {
  const increaseTempControl = document.querySelector('#increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);
  const decreaseTempControl = document.querySelector('#decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);
  const changeSkyControl = document.querySelector('#skySelect');
  changeSkyControl.addEventListener('change', changeSky);
  const cityText = document.querySelector('#cityNameInput');
  cityText.addEventListener('keyup', updateCityName);
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