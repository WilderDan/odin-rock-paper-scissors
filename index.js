let game = {
  score: {
    player: 0,
    computer: 0,
  },

  over: false,
  message: "",
};

const playerChoices = document.querySelectorAll(".playerSelection");
const resetBtn = document.querySelector("#reset-btn");

resetBtn.disabled = true;
resetBtn.addEventListener("click", handleReset);
window.addEventListener("keydown", handleKeyDown);
playerChoices.forEach((choice) =>
  choice.addEventListener("click", handlePlayerSelection)
);

updateUI();

function handleKeyDown(e) {
  const button = document.querySelector(`button[data-key="${e.code}"]`);
  if (button) button.click();
}

function handlePlayerSelection(e) {
  if (game.over) return;

  const playerSelection = e.currentTarget.name;
  playRound(playerSelection, getComputerChoice());
  checkForGameOver();
  updateUI();
}

function checkForGameOver() {
  if (game.score.player >= 5 || game.score.computer >= 5) {
    const winner =
      game.score.player > game.score.computer ? "Player" : "Computer";
    game.over = true;
    game.message = `Game Over! ${winner} wins.`;
    resetBtn.disabled = false;
  }
}

function handleReset() {
  game.score.player = 0;
  game.score.computer = 0;
  game.over = false;
  game.message = "";
  resetBtn.disabled = true;

  updateUI();
}

function displayResetBtn(show) {
  resetBtn.style.display = show ? "block" : "none";
}

function updateUI() {
  let playerScoreElem = document.getElementById("playerScore");
  let computerScoreElem = document.getElementById("computerScore");
  let resultMessageElem = document.getElementById("resultMessage");

  if (game.over) {
    displayResetBtn(true);
  } else {
    displayResetBtn(false);
  }

  playerScoreElem.innerText = game.score.player;
  computerScoreElem.innerText = game.score.computer;
  resultMessageElem.innerText = game.message;
}

function getComputerChoice() {
  const OPTIONS = ["ROCK", "PAPER", "SCISSORS"];
  let choice = getRandomInt(0, 2);
  return OPTIONS[choice];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRound(player, computer) {
  let beforeRoundScore = game.score.player;

  if (player === computer) {
    game.message = "Tie!";
    return;
  }

  if (player === "ROCK") {
    if (computer === "PAPER") ++game.score.computer;
    else ++game.score.player;
  } else if (player === "PAPER") {
    if (computer === "ROCK") ++game.score.player;
    else ++game.score.computer;
  } else if (player === "SCISSORS") {
    if (computer === "ROCK") ++game.score.computer;
    else ++game.score.player;
  }

  game.message =
    game.score.player > beforeRoundScore
      ? `You Win! ${player} beats ${computer}`
      : `You Lose! ${computer} beats ${player}`;
}
