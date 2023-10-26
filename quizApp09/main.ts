#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

console.log(chalk.bold.rgb(204, 204, 204)(`\n   <<<================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`<<<==========>>>  ${chalk.redBright.bold('Quizz')}  <<<==========>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`   <<<================================>>>\n`));

const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,1000)
    })
}
let apidata ="https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple"
let ApiLink="https://opentdb.com/api.php?amount=6&category=18&difficulty=medium&type=multiple"
let diiApiLink="https://opentdb.com/api.php?amount=6&category=18&difficulty=hard&type=multiple"

let fetchData=async(data:string)=>{
    let fetchQuizz:any=await fetch(data)
    let res = await fetchQuizz.json()
    return res.results
}
let Data=await fetchData(apidata)
let mData=await fetchData(ApiLink)
let hData=await fetchData(diiApiLink)

// console.log(Data);

async function startQuizz() {
    let score:number=0
    let name= await inquirer.prompt({
        name:'fName',
        type:"input",
        message:"Enter Your Name."
    })
    const {level}:{level:'Easy'|'Intermediate'|'Hard'}=await inquirer.prompt({
        type:'list',
        name:'level',
        message:'Select Your Level To Attempt Quizz',
        choices:['Easy','Intermediate','Hard']
    })
    let questions
    if(level==='Easy'){
        questions=Data
    }
    if(level==='Intermediate'){
        questions=mData
    }
    if(level==='Hard'){
        questions=hData
    }
    const spinner2 = createSpinner("Preparing Quizz").start()
    await sleep()
    spinner2.success({text:"Quizz Prepared"})
    for(let i=1; i<=5; i++){
        const question = questions[i]
        let answers=[...question.incorrect_answers,question.correct_answer]
        console.log(`\n`);
        console.log(chalk.bgRgb(205, 127, 50).whiteBright.bold(`Question ${i}/5`))
        let ans = await inquirer.prompt({
            name:"quiz",
            type:"list",
            message:question.question,
            choices:answers.map((val)=>val)
        })
        console.log(`\n`);
        if(ans.quiz===question.correct_answer){
            ++score
        }
    }
    const spinner = createSpinner("Calculate Result").start()
    await sleep()
    let percentage:number=(score*100)/questions.length
    spinner.success({text:"Result Calculated"})
    console.log(`\n`);
    console.log(chalk.bgRgb(247, 80, 2).whiteBright.bold(`                Result                `))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(245, 117, 66)(`Name:       ${chalk.whiteBright.bold(name.fName)}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(245, 117, 66)(`Marks:      ${chalk.whiteBright.bold(score +  " out of "  + questions.length)}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(245, 117, 66)(`Percentage: ${chalk.whiteBright.bold(percentage.toFixed(2)+"%")}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
    console.log(chalk.rgb(245, 117, 66)(`Grade:      ${percentage>=50 ? chalk.bgGreen.whiteBright("Passed!"):chalk.bgRgb(235, 79, 52).whiteBright("Failed!")}`))
    console.log(chalk.whiteBright(`--------------------------------------`))
}

async function endContinue() {
    do{
        await startQuizz()
        var input = await inquirer.prompt({
            name:'result',
            type:"confirm",
            message:"Do you want to Reattempt quizz?"
        })
    }while(input.result===true)
}
endContinue()