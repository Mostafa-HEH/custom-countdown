const inputContainer: HTMLInputElement = document.getElementById(
  "input-container"
) as HTMLInputElement;
const countdownForm: HTMLDivElement = document.getElementById(
  "countdownForm"
) as HTMLDivElement;
const dateEl: HTMLInputElement = document.getElementById(
  "date-picker"
) as HTMLInputElement;
const countdownEl: HTMLDivElement = document.getElementById(
  "countdown"
) as HTMLDivElement;
const countDownElTitle: HTMLHeadingElement = document.getElementById(
  "countdown-title"
) as HTMLHeadingElement;
const countdownBtn: HTMLButtonElement = document.getElementById(
  "countdown-button"
) as HTMLButtonElement;
const timeElements: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
  "span"
) as NodeListOf<HTMLSpanElement>;
const completeEl: HTMLDivElement = document.getElementById(
  "complete"
) as HTMLDivElement;
const completeElInfo: HTMLHeadingElement = document.getElementById(
  "complete-info"
) as HTMLHeadingElement;
const completeBtn: HTMLButtonElement = document.getElementById(
  "complete-button"
) as HTMLButtonElement;

let countdownTitle: string = "";
let countdownDate: string = "";
let countdownValue: any = Date;
let countdownActive: any;
let savedCountdown: {
  title: string;
  date: string;
};

const socend: number = 1000;
const minute: number = socend * 60;
const hour: number = minute * 60;
const day: number = hour * 24;

const today: string = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

const updateDOM: () => void = function (): void {
  countdownActive = setInterval(() => {
    const now: number = new Date().getTime();
    const distance: number = countdownValue - now;

    const days: number = Math.floor(distance / day);
    const hours: number = Math.floor((distance % day) / hour);
    const minutes: number = Math.floor((distance % hour) / minute);
    const socends: number = Math.floor((distance % minute) / socend);

    inputContainer.hidden = true;
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countDownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${socends}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, socend);
};

const updateCountdown: (e: any) => void = function (e: any): void {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please, select a date four countdown!");
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

const reset: () => void = function (): void {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdownActive);
  countdownDate = "";
  countdownTitle = "";
  localStorage.removeItem("countdown");
};

const restorePreviousCountdown: () => void = function (): void {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
};

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

restorePreviousCountdown();
