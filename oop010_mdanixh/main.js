#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
class Person {
    constructor(id, name, age, role) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.role = role;
    }
}
class Student extends Person {
    constructor(id, name, age, tags, role) {
        super(id, name, age, role);
        this.tags = tags;
        this.messages = [];
    }
    static createStudent(name, age, tags, role) {
        const id = `dhub${String(Student.studentId).padStart(3, '0')}`;
        Student.studentId++;
        return new Student(id, name, age, tags, role);
    }
    addMessage(message) {
        this.messages.push(message);
    }
}
Student.studentId = 1;
class Message {
    constructor(content, replies = []) {
        this.content = content;
        this.replies = replies;
    }
    addReply(content) {
        this.replies.push(content);
    }
}
const students = [];
const messages = [];
async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: `${chalk.green.bold("Welcome to DotHub! What would you like to do?")}`,
            choices: ['Register', 'Ask Query', 'Reply to Query', 'Contribute', 'Print Message', 'Print Users', 'Exit']
        }
    ]);
    switch (choice) {
        case 'Register':
            await handleRegistration();
            break;
        case 'Ask Query':
            await handleAskQuery();
            break;
        case 'Reply to Query':
            await handleReplyToQuery();
            break;
        case 'Contribute':
            console.log('Your contribution is valuable!');
            break;
        case 'Print Message':
            console.log(messages);
            break;
        case 'Print Users':
            printUsers();
            break;
        case 'Exit':
            exitApplication();
            break;
    }
    await mainMenu(); // Call the main menu again for continuous interaction.
}
function printUsers() {
    for (const student of students) {
        console.log(chalk.blueBright(`ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Role: ${student.role}, Tags: ${student.tags}`));
        if (student.messages.length > 0) {
            console.log(chalk.green('Messages:'));
            for (const message of student.messages) {
                console.log(`- ${message.content}`);
                if (message.replies.length > 0) {
                    console.log(chalk.yellow('Replies:'));
                    for (const reply of message.replies) {
                        console.log(`  - ${reply}`);
                    }
                }
            }
        }
        console.log('------------------------------------'); // separator for better readability
    }
}
async function handleRegistration() {
    const userData = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter your name:',
            validate: input => {
                return students.some(s => s.name === input) ? chalk.bgCyan.red.bold('User already exists.') : true;
            }
        },
        {
            type: 'input',
            name: 'age',
            message: 'Please enter your age:',
            validate: input => (isNaN(input) ? chalk.bgYellow.red.bold('Age must be a number.') : true)
        },
        {
            type: 'list',
            name: 'tags',
            message: 'Please select a tag:',
            choices: ['Typescript', 'Nextjs', 'Python']
        },
        {
            type: 'list',
            name: 'role',
            message: 'Select your role:',
            choices: ['Beginner', 'Intermediate', 'Advanced']
        }
    ]);
    const newUser = Student.createStudent(userData.name, Number(userData.age), userData.tags, userData.role);
    students.push(newUser);
    console.log(chalk.green.bold(`Welcome, ${newUser.name}! You are now registered.`));
}
async function handleAskQuery() {
    const { userName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'userName',
            message: 'Enter your registered name:',
            validate: input => (students.some(s => s.name === input) ? true : chalk.bgYellow.red.bold('User not found.'))
        }
    ]);
    const user = students.find(s => s.name === userName);
    if (!user)
        return;
    const { messageContent } = await inquirer.prompt([
        {
            type: 'input',
            name: 'messageContent',
            message: 'Enter your question:',
        }
    ]);
    const newMessage = new Message(messageContent);
    messages.push(newMessage);
    user.addMessage(newMessage);
    console.log(chalk.bgBlue.greenBright.bold(`Thank you, ${user.name}. Your question has been posted!`));
}
async function handleReplyToQuery() {
    const { userName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'userName',
            message: 'Enter your registered name:',
            validate: input => (students.some(s => s.name === input) ? true : 'User not found.' && clear())
        },
    ]);
    const user = students.find(s => s.name === userName);
    if (!user) {
        console.log(chalk.red('User not found.'));
        return;
    }
    const questions = messages.map((m, index) => {
        const studentWhoAsked = students.find(s => s.messages.includes(m));
        const studentName = studentWhoAsked ? studentWhoAsked.name : 'Unknown';
        return {
            name: `${m.content} (Asked by: ${studentName})`,
            value: index
        };
    });
    if (questions.length === 0) {
        console.log(chalk.yellow("No questions available to answer."));
        return;
    }
    const { selectedQuestionIndex } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedQuestionIndex',
            message: 'Select a question to reply to:',
            choices: questions
        }
    ]);
    const { replyContent } = await inquirer.prompt([
        {
            type: 'input',
            name: 'replyContent',
            message: 'Enter your reply:',
        }
    ]);
    messages[selectedQuestionIndex].addReply(replyContent);
    console.log(chalk.bgCyanBright.greenBright.bold(`Thank you, ${user.name}. Your reply has been posted!`));
}
async function exitApplication() {
    process.exit(0);
}
mainMenu(); // Start the application.
