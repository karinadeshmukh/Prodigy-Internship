
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');


let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(timer);
    startPauseBtn.textContent = 'Start';
    startPauseBtn.classList.replace('btn-secondary', 'btn-primary');
  } else {
    timer = setInterval(updateTime, 10);
    startPauseBtn.textContent = 'Pause';
    startPauseBtn.classList.replace('btn-primary', 'btn-secondary');
  }
  isRunning = !isRunning;
});


resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  isRunning = false;
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.replace('btn-secondary', 'btn-primary');
  updateDisplay();
  lapList.innerHTML = ''; // Clear laps
});

// Track lap times
lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds, true)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
});

// Update the stopwatch time
function updateTime() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  updateDisplay();
}

// Update the time display
function updateDisplay() {
  millisecondsEl.textContent = formatTime(milliseconds, true);
  secondsEl.textContent = formatTime(seconds);
  minutesEl.textContent = formatTime(minutes);
}

// Format time as two digits
function formatTime(value, isMilliseconds = false) {
  if (isMilliseconds) return Math.floor(value / 10).toString().padStart(2, '0');
  return value.toString().padStart(2, '0');
}
