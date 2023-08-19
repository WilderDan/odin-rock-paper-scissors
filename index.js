const getComputerChoice = () => {
  let options = ["Rock", "Paper", "Scissors"];
  let choice = getRandomInt(0, 2);

  return options[choice];
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
