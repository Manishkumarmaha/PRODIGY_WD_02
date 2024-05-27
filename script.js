document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById('display');
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('laps');

    let startTime = 0;
    let elapsedTime = 0;
    let intervalId;
    let isRunning = false;

    function updateDisplay(time) {
        const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
        display.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function startStopwatch() {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 1000);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    }

    function stopStopwatch() {
        clearInterval(intervalId);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }

    function resetStopwatch() {
        clearInterval(intervalId);
        startTime = 0;
        elapsedTime = 0;
        updateDisplay(0);
        lapsContainer.innerHTML = '';
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }

    function recordLap() {
        if (isRunning) {
            const lapTime = elapsedTime;
            const lapElement = document.createElement('div');
            lapElement.textContent = `Lap: ${display.textContent}`;
            lapsContainer.appendChild(lapElement);
        }
    }

    startStopBtn.addEventListener('click', () => {
        if (isRunning) {
            stopStopwatch();
        } else {
            startStopwatch();
        }
    });

    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);
});
