var vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
var keyboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z",];
var movieName = "";
var count = 0;
var sndbtn = new Audio(
  "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
);

var sndchs = new Audio("https://actions.google.com/sounds/v1/cartoon/pop.ogg");

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substr(0, index) +
    replacement +
    this.substr(index + replacement.length)
  );
};
// document.getElementById("bg-timer").style.display = "none";

document.getElementById("displaySection").innerHTML = `
  <div class="play start-game" id="displayPlay">
    <button onclick="chooseMode()">Play</button>
  </div>
`;

function chooseMode() {
  sndchs.play();
  sndchs.currentTime = 0;
  document.getElementById("spantypeWriter").style.opacity = "0";
  document.getElementById("displaySection").innerHTML = `
    <div class="play game-mode" id="gameMode">
      <button onclick="playGame('normal')">Normal</button>
      <button onclick="playGame('endless'); startTimer()">Endless</button>
      <button onclick="playGame('Hollywood')">Hollywood</button>
    </div>
  `;
}

function playGame(el) {
  document.getElementById("typeWriter").style.opacity = "0";
  sndchs.play();
  sndchs.currentTime = 0;
  document.getElementById("displaySection").innerHTML = `
  <div id="displayGame">
    <div class="bollywood-title">
      <h1>
        <span id="11">B</span>
        <span id="12">O</span>
        <span id="13">L</span>
        <span id="14">L</span>
        <span id="15">Y</span>
        <span id="16">W</span>
        <span id="17">O</span>
        <span id="18">O</span>
        <span id="19">D</span>
      </h1>                
    </div>
    <div class="displayMovie">
      <h2 id="displayQuestion"></h2>
    </div>
    <div id="app" class="timer-area"></div>
    <div class="col-sm-12 col-md-12 col-lg-12">
      <div id="virtualkeyboard">
        <div class="panel-body">
          <ul class="keyboard" id="listLetters">         
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
  if (el === "normal") {
    document.getElementById("app").style.display = "none";
    document.getElementById("11").innerHTML='B';
  } else if (el === "endless") {
    //Logic for endless
    // document.getElementById("bg-timer").style.display = "block";
    // move();
  } else {
    //Logic for hollywood
    document.getElementById("11").innerHTML='H';
  }
  keyboardFunc();
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

function keyboardFunc() {
  var newli;
  keyboard.forEach(function (el) {
    newli = document.createElement("li");
    newli.setAttribute(`id`, `${el}`);
    newli.setAttribute(`class`, `char`);
    newli.innerHTML = `
				<button onclick="checkGuess('${el}')">${el}</button></li>		
			`;
    document.getElementById("listLetters").appendChild(newli);
  });
}

var testMovie;
var hiddenAlpha = [];
function checkGuess(el) {
  sndbtn.play();
  sndbtn.currentTime = 0;
  if (movieFromBackend.indexOf(el) !== -1) {
    for (var i = 0; i < movieFromBackend.length; i++) {
      if (movieFromBackend[i] === el) {
        testMovie = movieName.replaceAt(i, el);
        movieName = testMovie;
      }
    }
  } else {
    count += 1;
    switch (count) {
      case 1:
        document.getElementById("11").style.textDecoration = "line-through";
        break;
      case 2:
        document.getElementById("12").style.textDecoration = "line-through";
        break;
      case 3:
        document.getElementById("13").style.textDecoration = "line-through";
        break;
      case 4:
        document.getElementById("14").style.textDecoration = "line-through";
        break;
      case 5:
        document.getElementById("15").style.textDecoration = "line-through";
        break;
      case 6:
        document.getElementById("16").style.textDecoration = "line-through";
        break;
      case 7:
        document.getElementById("17").style.textDecoration = "line-through";
        break;
      case 8:
        document.getElementById("18").style.textDecoration = "line-through";
        break;
      case 9:
        document.getElementById("19").style.textDecoration = "line-through";
        break;
    }
  }
  document.getElementById(el).style.visibility = "hidden";
  hiddenAlpha.push(el);
  document.getElementById("displayQuestion").innerHTML = movieName;
  gameComplete();
}

function gameComplete() {
  if (count === 9) {
    // if game is lost
    hiddenAlpha.forEach(function (el) {
      document.getElementById(el).style.visibility = "visible";
    });
    hiddenAlpha = [];
    for (var i = 11; i < 20; i++) {
      document.getElementById(String(i)).style.textDecoration = "none";
    }
    count = 0;
    document.getElementById("displaySection").innerHTML = `
      <div id="displayResult">
        <div id="gameLost" class="play game-mode game-result">
          <button class="genrateMovie" onclick="playAgain()">Play Again?</button>
          <h1>YOU LOSE!!</h1>
          <h2>The Movie Name is <span id="movieName"></span></h2>                
        </div>      
      </div>
    `;
    document.getElementById("movieName").innerHTML = movieFromBackend;
  }
  if (movieName.indexOf("_") === -1) {
    // if game is won
    count = 0;
    hiddenAlpha.forEach(function (el) {
      document.getElementById(el).style.visibility = "visible";
    });
    for (var i = 11; i < 20; i++) {
      document.getElementById(String(i)).style.textDecoration = "none";
    }
    document.getElementById("displaySection").innerHTML = `
      <div id="displayResult">
        <div id="gameWon" class="play game-mode game-result" >
          <h1>YOU WON!!</h1>
          </br>
          <button class="genrateMovie" onclick="playAgain()" >Play Again?</button>
        </div>
      </div>
    `;
  }
  genRandomMovieAjax();
}

function genRandomMovieAjax() {
  $(".genrateMovie").click(function () {
    $.ajax({
      type: "GET",
      url: "/regen_movie",
      data: {},
      dataType: "json",
      success: function (data) {
        console.log(data.question_text);
        movieFromBackend = data.question_text;
      },
    });
  });
}


function playAgain() {
  movieName = "";
  chooseMode();
}

// -------------------------------------------------TYPE----------------------------------------------------------------------

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
//-------------------------------------TYPE END-----------------------------------------------

//-------------Timer--------------------------------

var timerIndex = 0;
function move() {
  if (timerIndex == 0) {
    timerIndex = 1;
    var elem = document.getElementById("bg-timer");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        timerIndex = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}