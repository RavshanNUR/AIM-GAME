const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
let time = 0;
const board = document.querySelector("#board");
let score = 0;
const circleColor = ["red", "blue", "pink", "yellow", "green"];
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>    <h2 id ='again' class = 'again primary' style='cursor:pointer'  onclick = getElementById('again').style.color = 'red'>Занова</h2>`;
}

const startAgain = document.querySelector(".again");
console.log(startAgain);
// startAgain.addEventListener("click", () => {
//   board.style.background = "red";
//   alert("ura");
// });

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  const color = getRandomColor();
  console.log('color:', color)
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${color}`;

  circle.classList.add("circle");

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * circleColor.length);
  return circleColor[index];
}
