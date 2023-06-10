import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const textField = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onTimerStart);

btnStart.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure("Please choose a date in the future");
        // btnStart.disabled = true;
    } else {
        btnStart.disabled = false;
    }
  },
};

flatpickr(textField, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function onTimerStart() {
    Notiflix.Notify.success('Counting your time until the end!');

    timerId = setInterval(() => {
        btnStart.disabled = true;
        const countdown = new Date(textField.value) - new Date();

        if (countdown < 0) {
            clearInterval(timerId);
            return;
        }

        updatedTimerFields(convertMs(countdown));
    }, 1000)
}

function updatedTimerFields({ days, hours, minutes, seconds }) {
    daysField.textContent = addLeadingZero(days);
    hoursField.textContent = addLeadingZero(hours);
    minutesField.textContent = addLeadingZero(minutes);
    secondsField.textContent = addLeadingZero(seconds);
}