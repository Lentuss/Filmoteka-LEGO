import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const dateInput = document.querySelector("#datetime-picker")
const secondsDiv = document.querySelector('[data-seconds]');
const minutesDiv = document.querySelector('[data-minutes]');
const hoursDiv = document.querySelector('[data-hours]');
const daysDiv = document.querySelector('[data-days]')

startBtn.setAttribute("disabled", true)

let currentTime;
let targetTime;
let timeDifference = 0;
let timerId = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    currentTime = options.defaultDate;
    targetTime = selectedDates[0];
    
    if (selectedDates[0] <= options.defaultDate) {
      Notify.failure("Please choose a date in the future");
      
    } else {
      startBtn.removeAttribute("disabled");
      Notify.success('Great! Please, press "Start" ');     
    }
  },
};

let selectedDate = flatpickr("#datetime-picker", options);

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

const startCount = () => {

  timeDifference = targetTime - currentTime;
  startBtn.setAttribute("disabled", true);
  dateInput.setAttribute("disabled", true);

  setTimer();

  timerId = setInterval(
    timeUpdate, 1000);

function setTimer(){
  let { days, hours, minutes, seconds } = convertMs(timeDifference);

  secondsDiv.textContent = seconds;
  minutesDiv.textContent = minutes;
  hoursDiv.textContent = hours;
  daysDiv.textContent = days;
  }
   
 function timeUpdate () {
  
   if (timeDifference > 1000) {
      
      timeDifference -= 1000;
      setTimer()
   }
   else {

     clearInterval(timerId);

     Notify.info('The desired time is coming! Please refresh the page to select a new countdown date');
   }
    }
  }


startBtn.addEventListener("click", startCount);


