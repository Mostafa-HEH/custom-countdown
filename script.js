var inputContainer = document.getElementById("input-container");
var countdownForm = document.getElementById("countdownForm");
var dateEl = document.getElementById("date-picker");
var countdownEl = document.getElementById("countdown");
var countDownElTitle = document.getElementById("countdown-title");
var countdownBtn = document.getElementById("countdown-button");
var timeElements = document.querySelectorAll("span");
var completeEl = document.getElementById("complete");
var completeElInfo = document.getElementById("complete-info");
var completeBtn = document.getElementById("complete-button");
var countdownTitle = "";
var countdownDate = "";
var countdownValue = Date;
var countdownActive;
var socend = 1000;
var minute = socend * 60;
var hour = minute * 60;
var day = hour * 24;
var today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);
var updateDOM = function () {
    countdownActive = setInterval(function () {
        var now = new Date().getTime();
        var distance = countdownValue - now;
        var days = Math.floor(distance / day);
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var socends = Math.floor((distance % minute) / socend);
        inputContainer.hidden = true;
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = countdownTitle + " finished on " + countdownDate;
            completeEl.hidden = false;
        }
        else {
            countDownElTitle.textContent = "" + countdownTitle;
            timeElements[0].textContent = "" + days;
            timeElements[1].textContent = "" + hours;
            timeElements[2].textContent = "" + minutes;
            timeElements[3].textContent = "" + socends;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, socend);
};
var updateCountdown = function (e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    if (countdownDate === "") {
        alert("Please, select a date four countdown!");
    }
    else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
};
var reset = function () {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownDate = "";
    countdownTitle = "";
};
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);
