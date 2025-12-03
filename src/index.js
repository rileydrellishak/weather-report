// display a default value for temp
// when clicking up arrow, temp += 1
// when clicking down arrow, temp -= 1

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
}

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

// change color of temp text according to table in readme

// temperature ranges change landscape in weather garden according to table in readme

// register event handlers

const registerEventHandlers = () => {
  const increaseTempControl = document.querySelector('#increaseTempControl');
  increaseTempControl.addEventListener('click', increaseTemp);
  const decreaseTempControl = document.querySelector('#decreaseTempControl');
  decreaseTempControl.addEventListener('click', decreaseTemp);
  // const changeTempColor = document.querySelector('#tempValue');
  // changeTempColor.addEventListener('', colorTempValue);
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