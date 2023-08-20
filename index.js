const getComputerChoice = () => {
  let options = ["Rock", "Paper", "Scissors"];
  let choice = getRandomInt(0, 2);

  return options[choice];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const playRound = (playerSelection, computerSelection) => {
  let player = playerSelection.toUpperCase();
  let computer = computerSelection.toUpperCase();

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

const getResultMessage = (playerSelection, result) => {
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
