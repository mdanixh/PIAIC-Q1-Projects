#!/usr/bin/env node 
import inquirer from 'inquirer';
import chalk from 'chalk';
// Simulated user data (username and password)
const users = [
    { username: 'danish112102', password: "dan112102", balance: 1000 },
    { username: 'shaharyar112161', password: "sher112161", balance: 1500 },
];
// Function to find a user by username and password
function findUser(username, password) {
    return users.find((user) => user.username === username && user.password === password);
}
// Function to get the user's balance
function getBalance(username) {
    const user = users.find((user) => user.username === username);
    return user ? user.balance : 0;
}
// Function to perform a fund transfer
function transferFunds(sender, recipient, amount) {
    const senderUser = users.find((user) => user.username === sender);
    const recipientUser = users.find((user) => user.username === recipient);
    if (senderUser && recipientUser && senderUser.balance >= amount) {
        senderUser.balance -= amount;
        recipientUser.balance += amount;
        return true;
    }
    else {
        return false;
    }
}
async function main() {
    console.log(chalk.green('Welcome to the CLI Banking App!'));
    const credentials = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter your username:',
        },
        {
            type: 'input',
            name: 'password',
            message: 'Enter your password:',
        },
    ]);
    const { username, password } = credentials;
    const user = findUser(username, password);
    if (!user) {
        console.log(chalk.red('Authentication failed. Invalid username or password.'));
        return;
    }
    console.log(chalk.green('Authentication successful!'));
    while (true) {
        const operation = await inquirer.prompt([
            {
                type: 'list',
                name: 'operation',
                message: 'Select an operation:',
                choices: ['Balance Inquiry', 'Fund Transfer', 'Cash Withdrawal', 'Exit'],
            },
        ]);
        switch (operation.operation) {
            case 'Balance Inquiry':
                console.log(`Your current balance is: $${getBalance(username)}`);
                break;
            case 'Fund Transfer':
                const recipientInput = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'recipient',
                        message: 'Enter recipient username:',
                    },
                ]);
                const { recipient } = recipientInput;
                if (recipient === username) {
                    console.log(chalk.red('You cannot transfer funds to yourself.'));
                }
                else {
                    const amountInput = await inquirer.prompt([
                        {
                            type: 'number',
                            name: 'amount',
                            message: 'Enter the amount to transfer:',
                        },
                    ]);
                    const { amount } = amountInput;
                    if (transferFunds(username, recipient, amount)) {
                        console.log(chalk.green(`Successfully transferred $${amount} to ${recipient}.`));
                    }
                    else {
                        console.log(chalk.red('Fund transfer failed. Insufficient balance or invalid recipient.'));
                    }
                }
                break;
            case 'Cash Withdrawal':
                const withdrawalInput = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'amount',
                        message: 'Enter the amount to withdraw:',
                    },
                ]);
                const { amount } = withdrawalInput;
                if (amount <= 0 || amount > user.balance) {
                    console.log(chalk.red('Invalid withdrawal amount or insufficient balance.'));
                }
                else {
                    user.balance -= amount;
                    console.log(chalk.green(`Successfully withdrew $${amount}.`));
                }
                break;
            case 'Exit':
                console.log(chalk.blue('Thank you for using the CLI Banking App. Goodbye!'));
                return;
            default:
                console.log(chalk.red('Invalid operation.'));
                break;
        }
    }
}
main();
