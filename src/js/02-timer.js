import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const refs = {
    dateInput: document.querySelector('input'),
    startBtn: document.querySelector('[data-start]'),
    fieldDays: document.querySelector('[data-days]'), 
    fieldHours: document.querySelector('[data-hours]'),
    fieldMinutes: document.querySelector('[data-minutes]'),
    fieldSeconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.addEventListener('click', handledStart);

let setDate = null;
let currentDate = new Date;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        setDate = selectedDates[0]; 
        if (setDate < currentDate) {
            refs.startBtn.disabled = true;
            Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.startBtn.disabled = false;
        };
    },
};
flatpickr(refs.dateInput, options);

function handledStart() {
    refs.startBtn.disabled = true;
    intervalId = setInterval(() => {
        const currentTime = new Date;
        const deltaTime = setDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime)
        
        updateTimer({ days, hours, minutes, seconds });
        
        if (deltaTime < 0) {
            clearInterval(intervalId);
            return;
        };
    }, 1000);
    
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function updateTimer({ days, hours, minutes, seconds }) {
    refs.fieldDays.textContent = addLeadingZero(days);
    refs.fieldHours.textContent = addLeadingZero(hours);
    refs.fieldMinutes.textContent =addLeadingZero(minutes);
    refs.fieldSeconds.textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

