let starttime;
let updatetime;
let diff;
let interval;
let active = false;
let laps = [];

const display = document.getElementById("display");
const StartBtn = document.getElementById("Start");
const PauseBtn = document.getElementById("Pause");
const ResetBtn = document.getElementById("Reset");
const LapsBtn = document.getElementById("Lap"); // Corrected: changed 'Lap' to 'Laps'
const lapDisplay = document.getElementById("lap");

StartBtn.addEventListener('click', startTimer);
PauseBtn.addEventListener('click', pauseTimer);
ResetBtn.addEventListener('click', resetTimer);
LapsBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!active) {
        starttime = new Date().getTime() - (diff || 0);
        interval = setInterval(gettime, 1);
        active = true;
        StartBtn.innerHTML = 'Active';
        PauseBtn.style.display = 'inline';
        ResetBtn.style.display = 'inline';
        LapsBtn.style.display = 'inline';
    }
}

function pauseTimer() {
    if (active) {
        clearInterval(interval);
        active = false;
        StartBtn.innerHTML = 'Resume';
    }
}

function resetTimer() { // Corrected: Added parentheses and fixed typo 'flase' to 'false'
    clearInterval(interval);
    active = false;
    diff = 0;
    display.innerHTML = "00:00:00";
    StartBtn.innerHTML = "Start";
    laps = [];
    lapDisplay.innerHTML = '';
    LapsBtn.style.display = 'none';
    ResetBtn.style.display = 'none';
    PauseBtn.style.display = 'none';
}

function gettime() {
    updatetime = new Date().getTime();
    diff = updatetime - starttime;
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((diff % 1000) / 10);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() { // Corrected: Added parentheses, and used 'laps' array instead of 'lap'
    if (active) {
        laps.push(display.innerHTML); // Corrected: Changed 'lap.push' to 'laps.push'
        const lapElement = document.createElement('div');
        lapElement.innerHTML = `Lap ${laps.length}: ${display.innerHTML}`; // Corrected: Changed single quotes to backticks for template literal
        lapDisplay.appendChild(lapElement);
    }
}
