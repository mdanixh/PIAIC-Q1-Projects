#!/usr/bin/env node 
import inquirer from 'inquirer';
const todoList = [];
async function addTodoItem() {
    const todoText = await inquirer.prompt({
        type: 'input',
        name: 'text',
        message: 'Enter your Todo item:',
    });
    todoList.push({ text: todoText.text, completed: false });
    saveTodoList();
}
function listTodoItems() {
    console.log('Todo List:');
    todoList.forEach((item, index) => {
        const status = item.completed ? '[x]' : '[ ]';
        console.log(`${index + 1}. ${status} ${item.text}`);
    });
}
async function markTodoItemAsCompleted() {
    const todoIndex = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the index of the Todo item to mark as completed:',
    });
    if (todoList[todoIndex.index - 1]) {
        todoList[todoIndex.index - 1].completed = true;
        saveTodoList();
    }
    else {
        console.log('Invalid index.');
    }
}
function saveTodoList() {
    // Save the Todo list to a file here if needed
}
function loadTodoList() {
    // Load existing Todo items from a file here if needed
    return [];
}
async function main() {
    // Load existing Todo items from file
    todoList.push(...loadTodoList());
    while (true) {
        const choice = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Todo', 'List Todos', 'Mark Todo as Completed', 'Change Todo Status', 'Quit'],
        });
        switch (choice.action) {
            case 'Add Todo':
                await addTodoItem();
                break;
            case 'List Todos':
                listTodoItems();
                break;
            case 'Mark Todo as Completed':
                await markTodoItemAsCompleted();
                break;
            case 'Change Todo Status':
                await changeTodoStatus();
                break;
            case 'Quit':
                // You can add cleanup or save data here if needed
                console.log('Exiting Todo app.');
                return; // This will exit the main() function and the program.
        }
    }
}
async function changeTodoStatus() {
    const todoIndex = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Enter the index of the Todo item to change status:',
    });
    if (todoList[todoIndex.index - 1]) {
        todoList[todoIndex.index - 1].completed = !todoList[todoIndex.index - 1].completed;
        saveTodoList();
        console.log(`Todo item status changed to ${todoList[todoIndex.index - 1].completed ? 'completed' : 'not completed'}.`);
    }
    else {
        console.log('Invalid index.');
    }
}
main();
