let minguess = 0;
let maxguess;
let theNumber = 0;
let start = false;
let maxNumber = 100;
let guessNumber = 0;

function startGame() {
  document.querySelector('.start-button').classList.add('hide');
  document.querySelector('.between').classList.remove('hide');
  document.querySelector('.mode').classList.add('hide');
  document.querySelector('.guess-between').classList.remove('hide');
  document.querySelector('.guess-between').innerHTML = 'Gondoltam egy számra 0 és ' + maxNumber + ' között.';
  theNumber = Math.floor(Math.random() * maxNumber);
  minguess = 0;
  maxguess = maxNumber;
  console.log(theNumber);
  start = true;
  guessNumber = 0;
  document.querySelector('.guess-number').value = "";
}

function restartGame() {
  document.querySelector('.start-button').classList.remove('hide');
  document.querySelector('.mode').classList.remove('hide');
  document.querySelector('.between').classList.add('hide');
  document.querySelector('.mode').classList.remove('hide');
  document.querySelector('.guess-between').classList.add('hide');
  document.querySelector('.restart').classList.add('hide');
  document.querySelector('.guess-number').value = "";
}

function removeSelectClass(className) {
  options.forEach(option => {
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
  document.querySelector('.guess-number').value = "";
  guessNumber++;
  if (number < theNumber && number > minguess) {
    minguess = number;
  } else if (number > theNumber && number < maxguess) {
    maxguess = number;
  } else if (number == theNumber) {
    document.querySelector('.guess-between').innerHTML = theNumber + " TALÁLT! " + guessNumber + " tippre volt szükséged.";
    document.querySelector('.between').classList.add('hide');
    document.querySelector('.restart').classList.remove('hide');
    start = false;
  }
  const between = document.querySelector('.between');
  console.log(maxguess);
  between.innerHTML = "";
  if (minguess > 0) {
    between.innerHTML += minguess + " < ";
  }
  if (number == theNumber) {
    between.innerHTML += theNumber;
  } else {
    between.innerHTML += "X";
  }
  if (maxguess < maxNumber) {
    between.innerHTML += " < " + maxguess
  }
}

document.querySelector(".start-button").addEventListener("click", function () {
  startGame();
});

const options = document.querySelectorAll(".mode-option");

options.forEach(option => {
  option.addEventListener("click", function () {
    let gameModeName = option.getAttribute("name");
    switchGameMode(gameModeName);
    option.classList.add("select");
    removeSelectClass(gameModeName);
  });
});

document.querySelector('.guess-button').addEventListener("click", function () {
  const number = parseInt(document.querySelector('.guess-number').value);
  if (start) {
    guessIt(number);
  }
});

document.querySelector('.guess-number').addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    if (start) {
      const number = parseInt(document.querySelector('.guess-number').value);
      guessIt(number);
    }
  }
});

document.querySelector('.restart').addEventListener('click', function () {
  restartGame();
})