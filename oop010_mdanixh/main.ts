#!/user/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"
import { NumericLiteral } from "typescript"

class Person{
    id:string
    name: string
    age: number
    role!: string

    constructor(id: string, name: string, age: number, role: string){
        this.id = id
        this.name = name
        this.age = age
        this.role = role
    }
    
    get getId(){
        return this.id
    }

    get getName(){
        return this.name
    }

    get getRole(){
        return this.role
    }

    get getAge(){
        return this.age
    }

    set setRole(role: string){
        this.role = role
    }
    
}

class Student extends Person{
    tags: string
    action!: string
    message: Message[] =[]
    constructor(id:string, name:string, age:number, tags: string, role: string, action: string, message: Message[]){
    super(id, name, age, role)
    this.tags = tags
    this.action = action
    this.message = message
    }

    set setAction(action: string){
        this.action = action
    }
    private static studentId: number = 1;

    static createUser(name: string, age: number, tags: string, setRole: string, setAction:string, message: Message[]):Student{
        const id = `dhub${String(Student.studentId).padStart(3, '0')}`;
        Student.studentId++
        return new Student(id, name, age, tags, setRole, setAction, message)
    }

    get getTags(){
        return this.tags
    }
}

class Message{
    content: string
    replies: string[]=[]
    constructor(content:string){
        this.content = content
    }

    addReply(content: string){
        this.replies.push(content)
    }
}
const student: Student[] = []

async function Main() {
    do{

const startApp = await inquirer.prompt([
    {
        type: 'input',
        name: "name",
        message: "Please Enter your name:"
    },
    {
        type: 'input',
        name: "age",
        message: "Please enter your age:"
    },
    {
        type: 'list',
        name: "tags",
        message:"Please Select Tag",
        choices: ['Typescript', 'Nextjs', 'Python']

    },   
    {   type: "list",
        name: "role",
        message: "What is the role of the user?",
        choices: ['Bignner', 'Intermediate', 'Advance']    
    },
    {
        type: "list",
        name: "action",
        message: "Options:",
        choices: ['Ask Query', 'Contribute']
    },
    {
        type: "input",
        name: "message",
        message: "Enter your message:"
    }   
    ]);

const uppercaseName = startApp.name.toUpperCase();
console.log(chalk.cyan.bold(`Welcome ${chalk.green.bold(uppercaseName)}! to Dothub.`));

const newUser = Student.createUser(startApp.name, startApp.age, startApp.tags, startApp.role, startApp.action, startApp.message);
student.push(newUser);



console.log(chalk.blueBright("Your Information"))
console.log(chalk.yellow(`ID: ${newUser.getId}`));
console.log(chalk.yellow(`NAME: ${newUser.getName}`));
console.log(chalk.yellow(`AGE: ${newUser.getAge}`));
console.log(chalk.yellow(`TAGS: ${newUser.getTags}`));
console.log(chalk.yellow(`ROLE: ${newUser.getRole}`));
if (newUser.action == 'Ask Query'){
console.log(newUser)
console.log(`${newUser.name}  has a query on subject:`);
}
}while(true)
}

 
Main()