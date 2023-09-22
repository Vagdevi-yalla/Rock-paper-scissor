const computerScoreDisplay = document.getElementById("computer-score");
const userScoreDisplay = document.getElementById("user-score");
const rulesButton = document.querySelectorAll(".rules-button");
const nextButton = document.getElementById("next-btn");
const playAgainButton = document.querySelector("#play-again");
const replayButton = document.querySelector("#replay");
const closeButton = document.getElementById("close");
const rulesModal = document.getElementById("rules-modal");
const wonGameSection = document.querySelector(".won-game");
const playBoard = document.getElementById("play-board");
const resultBoard = document.getElementById("result-board");
const userPickedResult = document.querySelector(".user-result");
const pcPickedResult = document.querySelector(".pc-result");
let resultText1 = document.getElementById("text-1");
let resultText2 = document.getElementById("text-2");
let pickedElements = document.querySelectorAll(".picked");

//---------------------------------SCORE----------------------------------------------

let scoreData = {
  user: 0,
  computer: 0,
};

// LOCAL STORAGE -- GET SCORE
if (localStorage.getItem("scoreData")) {
  scoreData = JSON.parse(localStorage.getItem("scoreData"));
}

userScoreDisplay.innerHTML = scoreData.user;
computerScoreDisplay.innerHTML = scoreData.computer;

// -------------------- RESULT ------------------------------

const gameResult = {
  WIN: "YOU WIN",
  LOSE: "YOU LOSE",
  DRAW: "DRAW",
};

// ----------------------------- Event Listeners------------------------------------------------

rulesButton.forEach((button) => {
  button.addEventListener("click", () => {
    rulesModal.style.display = "block";
  });
});

closeButton.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

nextButton.addEventListener("click", () => {
  playBoard.style.display = "none";
  resultBoard.style.display = "none";
  wonGameSection.style.display = "flex";
});

playAgainButton.addEventListener("click", playAgain);

replayButton.addEventListener("click", playAgain);

function playAgain() {
  playBoard.style.display = "grid";
  resultBoard.style.display = "none";
  wonGameSection.style.display = "none";
  nextButton.style.display = "none";
}

// Computer Choices
const computerChoices = ["rock", "paper", "scissor"];

function computerPicked() {
  let pickedIndex = Math.floor(Math.random() * computerChoices.length);
  return computerChoices[pickedIndex];
}

function setImage(choice) {
  let imgHTML = `<img src="pictures/${choice}.png" alt="${choice}"/>`;
  return imgHTML;
}

function setStyles() {
  resultBoard.style.marginTop = "3rem";

  pickedElements.forEach((element) => {
    element.style.top = "50%";
    element.style.position = "relative";
  });

  for (let index = 0; index < 3; index++) {
    userPickedResult.classList.remove("rock-div");
    userPickedResult.classList.remove("paper-div");
    userPickedResult.classList.remove("scissor-div");
    pcPickedResult.classList.remove("rock-div");
    pcPickedResult.classList.remove("paper-div");
    pcPickedResult.classList.remove("scissor-div");

    playAgainButton.style.display = "block";
    resultText2.style.display = "block";
    replayButton.style.display = "none";
    nextButton.style.display = "none";
  }
}

//----------------------------Game Start---------------------------------------------

const startGame = (userChoice) => {
  let computerChoice = computerPicked();

  setStyles();

  let result;

  if (userChoice === computerChoice) {
    result = gameResult.DRAW;

    removeFocus();

    playAgainButton.style.display = "none";
    replayButton.style.display = "block";
    resultText2.style.display = "none";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    result = gameResult.WIN;

    nextButton.style.display = "block";

    focusOnUserWinner();

    // UPDATE SCORE -- USER WINS
    scoreData.user++;
  } else {
    result = gameResult.LOSE;

    focusOnComputerWinner();

    // UPDATE SCORE -- USER LOSES
    scoreData.computer++;
  }
  playBoard.style.display = "none";
  resultBoard.style.display = "flex";

  // RESULT BOARD
  userPickedResult.classList.add(`${userChoice}-div`);
  pcPickedResult.classList.add(`${computerChoice}-div`);
  userPickedResult.innerHTML = setImage(userChoice);
  pcPickedResult.innerHTML = setImage(computerChoice);
  resultText1.innerHTML = result;

  // SCORE BOARD
  userScoreDisplay.innerHTML = scoreData.user;
  computerScoreDisplay.innerHTML = scoreData.computer;

  // SAVING SCORE IN LOCAL STORAGE
  localStorage.setItem("scoreData", JSON.stringify(scoreData));
};

// circles

let userWinBox1 = document.querySelector(".circle-1");
let userWinBox2 = document.querySelector(".circle-2");
let userWinBox3 = document.querySelector(".circle-3");
let computerWinBox1 = document.querySelector(".circle-4");
let computerWinBox2 = document.querySelector(".circle-5");
let computerWinBox3 = document.querySelector(".circle-6");

let focusOnUserWinner = () => {
  computerWinBox1.classList.remove("winner-c-1");
  computerWinBox2.classList.remove("winner-c-2");
  computerWinBox3.classList.remove("winner-c-3");

  userWinBox1.classList.add("winner-c-1");
  userWinBox2.classList.add("winner-c-2");
  userWinBox3.classList.add("winner-c-3");
};

let focusOnComputerWinner = () => {
  userWinBox1.classList.remove("winner-c-1");
  userWinBox2.classList.remove("winner-c-2");
  userWinBox3.classList.remove("winner-c-3");

  computerWinBox1.classList.add("winner-c-1");
  computerWinBox2.classList.add("winner-c-2");
  computerWinBox3.classList.add("winner-c-3");
};

let removeFocus = () => {
  userWinBox1.classList.remove("winner-c-1");
  userWinBox2.classList.remove("winner-c-2");
  userWinBox3.classList.remove("winner-c-3");

  computerWinBox1.classList.remove("winner-c-1");
  computerWinBox2.classList.remove("winner-c-2");
  computerWinBox3.classList.remove("winner-c-3");
};
