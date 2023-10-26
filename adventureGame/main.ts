#!/usr/bin/env node

// Import necessary libraries
import inquirer from 'inquirer';
import chalk from 'chalk';
import { convertToObject } from 'typescript';
import Choice from 'inquirer/lib/objects/choice.js';
import Choices from 'inquirer/lib/objects/choices.js';


let playAgain = true;
// Define the Player class
class Player {
  name: string;
  health: number;
  points: number;

  constructor(name: string, health: number, points: number) {
    this.name = name.toUpperCase();
    this.health = health;
    this.points = points;
  }

    // Define a method to attack demons
    attackDemon(demon: Demon) { 
      return demon.health -= Math.floor(Math.random()*10); 
      }
}



// Define the Demon class
class Demon {
  name: string;
  health: number;
  points: number;

  constructor(name: string, health: number, points: number) {
    this.name = name
    this.health = health;
    this.points = points;
  }

      // Define a method for demon's attack
      attackPlayer(player: Player){
          return player.health -= Math.floor(Math.random()*10);
      }
}

//--------------------------------------------------------------------------//
console.log("--------------------------------");
console.log(chalk.bold.cyanBright("Welcome to the Dungeon!"))
console.log(chalk.italic.blueBright("Powered by: D-Lab"))
console.log("--------------------------------");
const playerName = await inquirer.prompt([
  {
  type: "input",
  name: "name",
  message: "Enter player name"
  }
])
const newPlayer = new Player(playerName.name, 50, 0)
console.log("--------------------------------");
console.log(newPlayer)
console.log("--------------------------------");
while(playAgain){

  while(true){
    let remainingLife =3;
    let enemy = ['Ra-One', 'Zombie', 'Lucifer']
    const selectEnemy = enemy[Math.floor(Math.random()*enemy.length)]
    let enemy_Choosen:Demon = new Demon(selectEnemy,(Math.floor(Math.random()* 75)), 0)
      
    if (selectEnemy === 'Ra-one' ||selectEnemy ===  'Zombie' ||selectEnemy ===  'Lucifer' ){
      console.log("-------------------------------------------------")
      console.log(chalk.red(`"${playerName.name.toUpperCase()}" VS " ${selectEnemy.toUpperCase()} "`))
      console.log("-------------------------------------------------")
      console.log(enemy_Choosen)
      console.log("-------------------------------------------------")
    
      while (newPlayer.health>0 && enemy_Choosen.health>0){
        const what_to_do = await inquirer.prompt([
          {
            type: "list",
            name: "doWhat",
            message: "Attack",
            choices: ["Attack", "Revive yourself"]
          }
        ]);
      
        if (what_to_do.doWhat === 'Attack') {
          newPlayer.attackDemon(enemy_Choosen);
          enemy_Choosen.attackPlayer(newPlayer)
      
          if (newPlayer.health > 0) {
            console.log("-------------------------------------------------");
            console.log("Player:", newPlayer);
            console.log("-------------------------------------------------");
            console.log("Enemy:", enemy_Choosen);
            console.log("-------------------------------------------------");
          } else if (newPlayer.health < 1) {
            console.log(chalk.red(`${newPlayer.name}\nYour health status is: ${newPlayer.health}. \n Do you want to Revive yourself?`));
          }else{
            console.log("You died!. Thanks for Playing D-Lab game....")
            process.exit(0)
          }
      
          if (enemy_Choosen.health <= 0) {
            console.log(chalk.greenBright.italic('Congratulations! You defeated the demon.'));
            
            // Check if there is another demon to fight
            const remainingEnemies = enemy.filter(enemyName => enemyName !== selectEnemy);
            if (remainingEnemies.length > 0 && newPlayer.health > 10) {
              const nextEnemy = remainingEnemies[Math.floor(Math.random() * remainingEnemies.length)];
              enemy_Choosen = new Demon(nextEnemy, Math.floor(Math.random() * 75), 0);
              console.log("-------------------------------------------------");
              console.log(chalk.red(`"${playerName.name.toUpperCase()}" VS "${nextEnemy.toUpperCase()}"`));
              console.log("-------------------------------------------------");
              console.log(enemy_Choosen);
              console.log("-------------------------------------------------");
            }
          }
          const healthConditionofPlayer = newPlayer.health
          if(healthConditionofPlayer < 0){
            console.log("You Died! Thanks for playing D-Lab game...")
            process.exit(0)
          }

          const allEnimiesDied = enemy.every(enemyName => enemy_Choosen.health <=0)
          if (allEnimiesDied) {
            const playAgainPrompt = await inquirer.prompt([
              {
                type: "list",
                name: "playAgain",
                message: "All enemies are defeated. Do you want to play again?",
                choices: ["Play Again", "Exit"]
              }
            ]);
            if (playAgainPrompt.playAgain === 'Play Again') {
              console.log("Starting a new game.....")
              newPlayer.health = 50
              remainingLife = 3
            }else {
              playAgain =false
              console.log("Thanks for playing D-Lab game! Good Bye!")
            }
          }
        } else if (what_to_do.doWhat === 'Revive yourself') {
          if (remainingLife > 0) {
            newPlayer.health += 50;
            remainingLife--;
            console.log("-------------------------------------------------");
            console.log(chalk.cyanBright(`REVIVED!\nYOUR CURRENT HEALTH STATUS: ${newPlayer.health}`));
          } else {
            console.log(chalk.blueBright("You have already used all the Life Lines!"));
          }
        }
        
      
        if (newPlayer.health <= 0) {
          console.log(chalk.yellowBright(`As your health status is: ${newPlayer.health}`));
          console.log(chalk.red("You Lost the Battle!"));
        }
      }
    }
  } 
}