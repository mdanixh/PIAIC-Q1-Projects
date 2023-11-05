#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

const maxAttemptsPerLevel = 10; // Maximum attempts per level
let level = 1; // Initialize the level

async function guessNumberGame() {
  while (level <= 2) {
    let hello = chalk.bgGreenBright(`Welcome to Level ${level} of the Number Guessing Game!`);
        console.log(hello);

    let attempts = 0; // Initialize attempts for each level
    let maxNumber = level === 1 ? 10 : 20; // Adjust the max number based on the level

    while (attempts < maxAttemptsPerLevel) {
      console.log(chalk.yellowBright(`Level ${level}`));

      let sysGeneratedNumber = Math.floor(Math.random() * (maxNumber)); // Generate a new number for each level

      const answers = await inquirer.prompt([
        {
          message: `Enter your guess (between 0 and ${maxNumber})\nAttempt ${attempts + 1}/${maxAttemptsPerLevel}:`,
          type: "number",
          name: "guessNumber",
          validate: (input) => {
            if (input < 0 || input > maxNumber) {
              return `Please enter a number between 0 and ${maxNumber}.`;
            }
            return true;
          },
        },
      ]);

      const answer = answers.guessNumber;

      if (answer === sysGeneratedNumber) {
        console.log(chalk.bgYellow(`Congratulations! You guessed the correct number in ${attempts + 1} attempts.`));

        if (level === 1) {
          if (attempts < maxAttemptsPerLevel - 1) {
            level++; // Move to the next level only if not at the 10th attempt
            console.log(chalk.redBright(`You have advanced to Level ${level}!`));
          } else {
            console.log(chalk.red("You have completed Level 1, but you are out of attempts."));
            break;
          }
        } else {
          console.log(chalk.blueBright(`You have completed Level ${level}!`));
          return; // Exit the game after completing Level 2
        }
      } else {
        console.log(chalk.yellow('Sorry, try again.'));
        attempts++;
      }
    }

    if (attempts === maxAttemptsPerLevel) {
      const playAgain = await inquirer.prompt([
        {
          message: "You've run out of attempts. Do you want to play again?",
          type: "confirm",
          name: "playAgain",
        },
      ]);

      if (playAgain.playAgain) {
        level = 1; // Reset the level
        console.log(chalk.blue("Starting a new game."));
      } else {
        console.log(chalk.red("Thank you for playing. Goodbye!"));
        return; // Exit the game
      }
    }
  }
}

guessNumberGame();
