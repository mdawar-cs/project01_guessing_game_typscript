import inquirer from "inquirer";

// interface Player {
//     playerName: string;
//     playerScore: number;
// }

let randomNumber = Math.floor(Math.random() * 10);
console.log(randomNumber);


async function guessTheNumber() {
    var answers = await inquirer
   .prompt([
     {
         type: 'number',
         name: 'guessedNum',
         message: "Guess the number please",
     },   
   ])

   if(answers.guessedNum === randomNumber){
    console.log("You guessed it right");
   } else {
    console.log("Try again");
   }

};


guessTheNumber();
