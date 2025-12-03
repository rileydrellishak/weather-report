const state = {
  tempNum: 72,
  tempValue: null,
  tempColor: null
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

const increaseTemp = (event) => {
  let tempValue = document.querySelector('#tempValue');
  state.tempNum += 1;
  tempValue.textContent = `${state.tempNum}`;
  colorTempValue(state.tempNum);
};

const decreaseTemp = (event) => {
  let tempValue = document.querySelector('#tempValue');
  state.tempNum -= 1;
  tempValue.textContent = `${state.tempNum}`;
  colorTempValue(state.tempNum);
};

const registerEventHandlers = () => {
  const increaseTempControl = document.querySelector('#increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);
  const decreaseTempControl = document.querySelector('#decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);
};


const loadControls = () => {
  state.tempValue = document.getElementById('tempValue');
  state.tempValue.textContent = state.tempNum;
  state.tempValue.classList.add('orange');
};

const onLoaded = () => {
  loadControls();
  registerEventHandlers();
};

onLoaded();