var vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

upper_layer = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
middle_layer = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
bottom_layer = ["z", "x", "c", "v", "b", "n", "m"];

var movieFromBackend = "Avengers Endgame";

var movieName = "";

var count=0;

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};

document.getElementById("displayGame").style.display = "none";
document.getElementById("gameMode").style.display = "none";

function chooseMode() {
  document.getElementById("displayPlay").style.display = "none";
  document.getElementById("gameMode").style.display = "block";
}

function playGame(el) {
  document.getElementById("gameMode").style.display = "none";
  document.getElementById("displayGame").style.display = "block";
  checkLetter();
  document.getElementById("displayQuestion").innerHTML = movieName;
}

function checkLetter() {
  for (var j = 0; j < movieFromBackend.length; j++) {
    if (
      vowels.indexOf(movieFromBackend[j]) === -1 &&
      movieFromBackend[j] !== " "
    ) {
      movieName += "_";
    } else if (movieFromBackend[j] === " ") {
      movieName += " ";
    } else {
      movieName += movieFromBackend[j];
    }
  }
}

var testMovie;
function testFunction(el) {
 
  if (movieFromBackend.indexOf(el) !== -1) {
    for (var i = 0; i < movieFromBackend.length; i++) {
      if (movieFromBackend[i] === el) {
        testMovie = movieName.replaceAt(i, el);
        movieName = testMovie;
      }
    }
  } else {
    count+=1;
      switch ( count )
      {
        case 1: document.getElementById("1").style.textDecoration = "line-through";break;
        case 2: document.getElementById("2").style.textDecoration = "line-through";break;
        case 3: document.getElementById("3").style.textDecoration = "line-through";break;
        case 4: document.getElementById("4").style.textDecoration = "line-through";break;
        case 5: document.getElementById("5").style.textDecoration = "line-through";break;
        case 6: document.getElementById("6").style.textDecoration = "line-through";break;
        case 7: document.getElementById("7").style.textDecoration = "line-through";break;
        case 8: document.getElementById("8").style.textDecoration = "line-through";break;
        case 9: document.getElementById("9").style.textDecoration = "line-through";break;
      }
  }

  document.getElementById("displayQuestion").innerHTML = movieName;
}

// -------------------------------------------------FOR TIMER----------------------------------------------------------------------

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 90;
const ALERT_THRESHOLD = 45;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 180;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;



function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


//-------------------------------------FADE OUT-----------------------------------------------

