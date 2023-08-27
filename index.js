const OPTIONS = ["ROCK", "PAPER", "SCISSORS"];
const PLAYER = 0;
const COMPUTER = 1;

let score = [0, 0];
const buttons = document.querySelectorAll(".playerSelection");

buttons.forEach((button) =>
  button.addEventListener("click", handlePlayerSelection)
);

function handlePlayerSelection(e) {
  const playerSelection = e.currentTarget.name;
  const result = playRound(playerSelection, getComputerChoice());

  updateScore(result);
  updateUI(playerSelection, result);
}

function updateUI(selection, result) {
  let playerScoreElem = document.getElementById("playerScore");
  let computerScoreElem = document.getElementById("computerScore");
  let resultMessageElem = document.getElementById("resultMessage");

  playerScoreElem.innerText = score[PLAYER];
  computerScoreElem.innerText = score[COMPUTER];
  resultMessageElem.innerText = getRoundResultMessage(selection, result);
}

const getComputerChoice = () => {
  let choice = getRandomInt(0, 2);
  return OPTIONS[choice];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const playRound = (playerSelection, computerSelection) => {
  let player = playerSelection.toUpperCase();
  let computer = computerSelection.toUpperCase();

  // Error
  if (!OPTIONS.includes(player) || !OPTIONS.includes(computer)) {
    return null;
  }

  if (player === computer) {
    return 0;
  }

  if (player === "ROCK") {
    return computer === "PAPER" ? -1 : 1;
  } else if (player === "PAPER") {
    return computer === "ROCK" ? 1 : -1;
  } else if (player === "SCISSORS") {
    return computer === "ROCK" ? -1 : 1;
  }
};

const getRoundResultMessage = (playerSelection, result) => {
  let selection = playerSelection.toUpperCase();

  if (result === 0) {
    return "Tie!";
  }

  if (result === 1) {
    return "You win! " + selection + " beats " + getWinsAgainst(selection);
  }

  if (result === -1) {
    return "You Lose! " + getLosesAgainst(selection) + " beats " + selection;
  }
};

const getWinsAgainst = (selection) => {
  let s = selection.toUpperCase();

  return s === "ROCK" ? "SCISSORS" : s === "PAPER" ? "ROCK" : "PAPER";
};

const getLosesAgainst = (selection) => {
  let s = selection.toUpperCase();

  return s === "ROCK" ? "PAPER" : s === "PAPER" ? "SCISSORS" : "ROCK";
};

const game = (rounds) => {
  // 0 index is player's score. 1 for computer
  let score = [0, 0];

  for (let i = 0; i < rounds; i++) {
    let playerSelection = prompt("Rock, paper, or scissors?");

    if (!OPTIONS.includes(playerSelection.toUpperCase())) {
      console.log("Invalid selection. Skipping round.");
      continue;
    }

    let result = playRound(playerSelection, getComputerChoice());
    updateScore(result, score);
    console.log(getRoundResultMessage(playerSelection, result));
  }

  console.log(getGameResultMessage(score));
};

const updateScore = (result) => {
  if (result === 1) {
    ++score[PLAYER];
  } else if (result === -1) {
    ++score[COMPUTER];
  }
};

const getGameResultMessage = (score) => {
  const player = score[0];
  const computer = score[1];

  const result =
    player > computer ? "You Win!" : player < computer ? "You Lose!" : "Tie!";

  return result + ` ${player} - ${computer}`;
};
