let minguess = 0;
let maxguess;
let theNumber = 0;
let start = false;
let maxNumber = 100;
let guessNumber = 0;

const startButtonDiv = document.querySelector('.start-button');
const betweenDiv = document.querySelector('.between');
const modeDiv = document.querySelector('.mode');
const guessBetweenDiv = document.querySelector('.guess-between');
const guessNumberDiv = document.querySelector('.guess-number');
const restartDiv = document.querySelector('.restart');
const modeOptionsDiv = document.querySelectorAll(".mode-option");
const guessButtonDiv = document.querySelector('.guess-button');

function startGame() {
  startButtonDiv.classList.add('hide');
  betweenDiv.classList.remove('hide');
  modeDiv.classList.add('hide');
  guessBetweenDiv.classList.remove('hide');
  guessBetweenDiv.innerHTML = 'Gondoltam egy számra 0 és ' + maxNumber + ' között.';
  guessNumberDiv.value = "";
  guessNumberDiv.focus();
  betweenDiv.innerHTML = " X ";
  theNumber = Math.floor(Math.random() * maxNumber);
  minguess = -1;
  maxguess = maxNumber;
  start = true;
  guessNumber = 0;
}

function restartGame() {
  startButtonDiv.classList.remove('hide');
  modeDiv.classList.remove('hide');
  betweenDiv.classList.add('hide');
  modeDiv.classList.remove('hide');
  guessBetweenDiv.classList.add('hide');
  restartDiv.classList.add('hide');
  guessNumberDiv.value = "";
}

function removeSelectClass(className) {
  modeOptionsDiv.forEach(option => {
    if (option.getAttribute("name") !== className) {
      option.classList.remove("select");
    }
  })
}

function switchGameMode(gameModeName) {
  switch (gameModeName) {
    case 'easy':
      maxNumber = 100;
      break;
    case 'medium':
      maxNumber = 1000;
      break;
    case 'hard':
      maxNumber = 10000;
  }
}

function guessIt(number) {
  if (Number.isInteger(number)) {
    guessNumberDiv.value = "";
    guessNumber++;
    if (number < theNumber && number > minguess) {
      minguess = number;
    } else if (number > theNumber && number < maxguess) {
      maxguess = number;
    } else if (number == theNumber) {
      guessBetweenDiv.innerHTML = theNumber + " TALÁLT! " + guessNumber + " tippre volt szükséged.";
      betweenDiv.classList.add('hide');
      restartDiv.classList.remove('hide');
      start = false;
    }
    betweenDiv.innerHTML = "";
    if (minguess > -1) {
      betweenDiv.innerHTML += minguess + " < ";
    }
    betweenDiv.innerHTML += "X";
    if (maxguess < maxNumber) {
      betweenDiv.innerHTML += " < " + maxguess
    }
  } else {
    guessNumberDiv.value = "";
  }
}

startButtonDiv.addEventListener("click", function () {
  startGame();
});

modeOptionsDiv.forEach(option => {
  option.addEventListener("click", function () {
    let gameModeName = option.getAttribute("name");
    switchGameMode(gameModeName);
    option.classList.add("select");
    removeSelectClass(gameModeName);
  });
});

guessButtonDiv.addEventListener("click", function () {
  const number = parseInt(document.querySelector('.guess-number').value);
  if (start) {
    guessIt(number);
  }
});

guessNumberDiv.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    if (start) {
      const number = parseInt(guessNumberDiv.value);
      guessIt(number);
    }
  }
});

restartDiv.addEventListener('click', function () {
  restartGame();
})