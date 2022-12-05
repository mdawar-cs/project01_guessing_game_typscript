#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
};

async function greet() {
  let rainbowTitle = chalkAnimation.rainbow(
    "Welcome to Guess the Number game, By M.Dawar"
  );
  await sleep();
  rainbowTitle.stop();
}

await greet();

async function playGuessGame() {
  var playerInput = await inquirer.prompt([
    {
      type: "string",
      name: "playerName",
      message: "Player please enter your name: ",
    },
    {
      type: "list",
      name: "levelOfDifficulty",
      message: "What difficulty level you want to play this game?",
      choices: ["Easy", "Hard"],
    },
  ]);

  let isGuessNum: boolean = false;
  let numberOfAttempts = 0;
  let guessDifficulty = 0;

  do {
    if (playerInput.levelOfDifficulty == "Easy") {
      guessDifficulty = 10;
    } else if (playerInput.levelOfDifficulty == "Hard") {
      guessDifficulty = 100;
    }
  } while (guessDifficulty == 0);
  // console.log(guessDifficulty);

  let randomNumber = Math.floor(Math.random() * guessDifficulty);
  // console.log(randomNumber);

  do {
    var guessedNumInput = await inquirer.prompt([
      {
        type: "number",
        name: "guessedNum",
        message:
          "Please enter the number of your choice to guess from 0 to " +
          guessDifficulty +
          " :",
      },
    ]);

    if (guessedNumInput.guessedNum === randomNumber) {
      console.clear();
      let rainbowTitle = chalkAnimation.rainbow(
        "Congratulations! " + playerInput.playerName + " Wins!"
      );
      await sleep();
      rainbowTitle.stop();

      console.log(
        chalk.greenBright(
          "You guessed in " + numberOfAttempts + " attempt."
        )
      );

      isGuessNum = true;
    } else if (guessedNumInput.guessedNum > guessDifficulty) {
      numberOfAttempts++;
      console.log(
        chalk.redBright(
          "Your guessed number is out of range. Number of attempt: " +
            numberOfAttempts
        )
      );
    } else if (guessedNumInput.guessedNum > randomNumber) {
      numberOfAttempts++;
      console.log(
        chalk.yellowBright(
          "Lower the number please. Number of attempt: " + numberOfAttempts
        )
      );
    } else if (guessedNumInput.guessedNum < randomNumber) {
      numberOfAttempts++;
      console.log(
        chalk.yellowBright(
          "Higher the number please. Number of attempt: " + numberOfAttempts
        )
      );
    } else {
      numberOfAttempts++;
      console.log(
        chalk.redBright(
          "Something went wrong with Your guessed number. Number of attempt: " +
            numberOfAttempts
        )
      );
    }
  } while (!isGuessNum);
}

async function playAgain() {
  do {
    await playGuessGame();
    var again = await inquirer.prompt([
      {
        type: "input",
        name: "restart",
        message: "Do you want to play again as a new player? Press y or Y",
      },
    ]);
  } while (again.restart == "y" || again.restart == "Y");
}

await playAgain();
// playGuessGame();