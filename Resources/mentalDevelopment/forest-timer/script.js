document.addEventListener("DOMContentLoaded", () => {
    let minutes = 25;
    let seconds = 0;
    let timerRunning = false;
    let interval;
    let progress = 0;

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const tree = document.getElementById("tree");

    function updateDisplay() {
        minutesDisplay.textContent = String(minutes).padStart(2, "0");
        secondsDisplay.textContent = String(seconds).padStart(2, "0");
    }

    function startTimer() {
        if (!timerRunning) {
            timerRunning = true;
            interval = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(interval);
                    growTree();
                    alert("Time's up! Take a break.");
                    resetTimer();
                    return;
                }
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateDisplay();
                updateProgress();
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(interval);
        timerRunning = false;
    }

    function resetTimer() {
        clearInterval(interval);
        minutes = 25;
        seconds = 0;
        progress = 0;
        progressBar.value = 0;
        progressText.textContent = "0% Completed";
        tree.style.transform = "scale(1)";
        timerRunning = false;
        updateDisplay();
    }

    function updateProgress() {
        progress += 0.066; // Incremental progress
        progressBar.value = progress;
        progressText.textContent = `${Math.round(progress)}% Completed`;
    }

    function growTree() {
        tree.style.transform = "scale(1.5)"; // Tree grows when timer completes
    }

    document.getElementById("startBtn").addEventListener("click", startTimer);
    document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
    document.getElementById("resetBtn").addEventListener("click", resetTimer);

    updateDisplay();
});
