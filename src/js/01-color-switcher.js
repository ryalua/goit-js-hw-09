const refs = {
    bodyStyle: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', handledStartBtn);
refs.stopBtn.addEventListener('click', handledStopBtn);
let switcherColor = null;

function handledStartBtn() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    switcherColor = setInterval(() => {
        refs.bodyStyle.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function handledStopBtn() {
    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
    clearInterval(switcherColor);
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};