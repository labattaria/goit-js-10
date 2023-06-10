const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', onColorChange);
btnStop.addEventListener('click', onColorStop);

let intervalId = null;
btnStop.disabled = true;

function onColorChange() {
    btnStart.disabled = true;
    btnStop.disabled = false;

    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, 1000);
}

function onColorStop() {
    clearInterval(intervalId);
    btnStart.disabled = false;
    btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}