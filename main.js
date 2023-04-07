// VARIABLE DECLARATIONS
let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let workTime = 25;
let breakTime = 5;
let isBreak = true;
let isPaused = true;

// DOM ELEMENTS
const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

// AUDIO ELEMENT
const alarm = document.createElement('audio');
alarm.setAttribute("src", "https://www.soundjay.com/clock/alarm-clock-01.mp3");

// EVENT LISTENERS
startBtn.addEventListener('click', handleStartBtn);
resetBtn.addEventListener('click', handleResetBtn);

// UPDATE FUNCTIONS
const updateFunctions = {
  "#work-plus": () => workTime = Math.min(workTime + 5, 60),
  "#work-minus": () => workTime = Math.max(workTime - 5, 5),
  "#break-plus": () => breakTime = Math.min(breakTime + 5, 60),
  "#break-minus": () => breakTime = Math.max(breakTime - 5, 5),
};

// ADD EVENT LISTENERS TO UPDATE BUTTONS
for (const [key, value] of Object.entries(updateFunctions)) {
  document.querySelector(key).addEventListener('click', value);
}

// TIMER FUNCTION
function timer() {
  seconds--;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakTime : workTime) * 60;
    isBreak = !isBreak;
    countdown = setInterval(timer, 1000);
  }
}

// START BUTTON HANDLER
function handleStartBtn() {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
  updateHTML();
}

// RESET BUTTON HANDLER
function handleResetBtn() {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
  updateHTML();
}

// UPDATE DISPLAY FUNCTIONS
function countdownDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue"; 
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Almost there" : status.textContent = "Take a Break!";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;  
}

// AUTO-UPDATE DISPLAY
window.setInterval(updateHTML, 100);
document.onclick = updateHTML;
