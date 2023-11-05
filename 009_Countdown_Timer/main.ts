#!/usr/bin/env node
import readline from "readline"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer: string) => {
            resolve(answer);
        });
    });
}

async function main() {
    const targetDateStr: string = await askQuestion("Please enter the target date and time in the format (YYYY-MM-DD HH:MM:SS): ");
    const targetDateParts = targetDateStr.split(' ');
    const dateParts = targetDateParts[0].split('-');
    const timeParts = targetDateParts[1].split(':');

    const targetDate = new Date(parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1, 
    parseInt(dateParts[2]), 
    parseInt(timeParts[0]), 
    parseInt(timeParts[1]), 
    parseInt(timeParts[2])
    )

    if (isNaN(targetDate.getTime())) {
        console.error("Invalid date format.");
        rl.close();
        return;
    }

    setInterval(() => {
        const now = new Date();
        const diffMs = targetDate.getTime() - now.getTime();

        if (diffMs <= 0) {
            console.log("Countdown finished!");
            process.exit();
        }

        const diffSecs = Math.floor(diffMs / 1000);
        const hours = Math.floor(diffSecs / 3600);
        const minutes = Math.floor((diffSecs % 3600) / 60);
        const seconds = diffSecs % 60;

        console.clear();
        console.log(`Time remaining: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    }, 1000);
}

main();
