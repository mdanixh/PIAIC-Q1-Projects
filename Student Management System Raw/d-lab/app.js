#!/usr/bin/env node
import inquirer from "inquirer";
import fs from 'fs'; // Import the 'fs' module to work with files.
import chalk from 'chalk';
let jsonData = [];
let courseJson = [];
let databaseJson = [];
const studentsFilePath = 'database.json'; // JSON file for storing student data.
try {
    const dataJSONString = fs.readFileSync(studentsFilePath, 'utf-8');
    databaseJson = JSON.parse(dataJSONString);
}
catch (error) {
    console.error('error', error);
}
const instructorFilePath = 'instructor.json'; //JSON file for storing instructors data.
try {
    const jsonDataString = fs.readFileSync(instructorFilePath, 'utf-8');
    jsonData = JSON.parse(jsonDataString);
}
catch (error) {
    console.error('error', error);
}
const courseFilePath = 'coursesInq.json'; //JSON file for storing instructors data.
try {
    const jsonCourseString = fs.readFileSync(instructorFilePath, 'utf-8');
    courseJson = JSON.parse(jsonCourseString);
}
catch (error) {
    console.error('error', error);
}
// Function to read data from the JSON file.
function readDataFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        // If the file doesn't exist or there's an error, return an empty array.
        return [];
    }
}
function readDataforInstructor(filePath) {
    try {
        const data1 = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data1);
    }
    catch (err) {
        return [];
    }
}
function readDataforCourse(filePath) {
    try {
        const data2 = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data2);
    }
    catch (err) {
        return [];
    }
}
// Function to write data to the JSON file.
function writeDataToFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 400), 'utf-8');
}
function writeDataforInst(filePath, data1) {
    fs.writeFileSync(filePath, JSON.stringify(data1, null, 400), 'utf-8');
}
function writeDataforCourse(filePath, data1) {
    fs.writeFileSync(filePath, JSON.stringify(data1, null, 400), 'utf-8');
}
class Person {
    constructor(id, name, age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
class Student extends Person {
    constructor(id, name, age, feeStatus) {
        super(id, name, age);
        this.courses = [];
        this.rollNo = this.generateRollNo();
        this.feeStatus = feeStatus;
    }
    generateRollNo() {
        // Generate roll numbers like S001, S002, S003, ...
        const rollNo = `S${String(Student.rollNoCounter).padStart(3, '0')}`;
        Student.rollNoCounter++;
        return rollNo;
    }
    static createStudent(name, age, feeStatus) {
        // Generate IDs like DS001, DS002, DS003, ...
        const id = `DS${String(Student.studentCounter).padStart(3, '0')}`;
        Student.studentCounter++;
        return new Student(id, name, age, feeStatus);
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getRollNo() {
        return this.rollNo;
    }
    setCourses(courses) {
        this.courses = courses;
    }
    assignCourse(courseName) {
        // Check if the course is already assigned to the student.
        if (courseName && this.feeStatus === true) {
            this.courses.push(courseName);
            console.log(`Course "${courseName}" has been assigned to ${this.name}.`);
        }
        else {
            console.log('Selected course not found.');
        }
    }
}
Student.studentCounter = 1;
Student.rollNoCounter = 1;
const students = [];
class Instructor extends Person {
    constructor(id, name, age, salary) {
        super(id, name, age);
        this.courses = [];
        this.assignedCourse = [];
        this.salary = salary;
        this.pin = this.generatePin();
    }
    ;
    generatePin() {
        // Generate pin numbers like S001, S002, S003, ...
        const pin = `T${String(Instructor.pinCounter).padStart(3, '0')}`;
        Instructor.pinCounter++;
        return pin;
    }
    ;
    static createInstructor(name, age, salary) {
        // Generate IDs like DS001, DS002, DS003, ...
        const id = `TS${String(Instructor.instructorCounter).padStart(3, '0')}`;
        Instructor.instructorCounter++;
        return new Instructor(id, name, age, salary);
    }
    ;
    getInstructorName() {
        return this.name;
    }
    ;
    getInstructorPin() {
        return this.pin;
    }
    ;
    getSalary() {
        return this.salary;
    }
    ;
}
Instructor.instructorCounter = 1;
Instructor.pinCounter = 1;
const instructors = [];
class Course {
    constructor(courseId, courseName, courseFee) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseFee = courseFee;
        this.coursesForAdmission = [];
    }
    setInstructor(instructor) {
        this.courseInstructor = instructor;
        // Push the course name into the instructor's courses array.
        if (this.courseName && instructor) {
            instructor.courses.push(this.courseName);
        }
    }
}
const courses = [];
async function main() {
    while (true) {
        const choice = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an action:",
                choices: [
                    'Add Student',
                    'Add Instructor',
                    'Add Course',
                    'Student Details',
                    'Student Report (SR-101)',
                    'Course Report(CR-101)',
                    'Instructor Report(IR-101)',
                    'Exit'
                ]
            }
        ]);
        switch (choice.action) {
            case 'Add Student':
                console.log('Add Student:');
                const inqAddStd = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter student name:",
                    },
                    {
                        type: "number",
                        name: "age",
                        message: "Enter student age:",
                    },
                    {
                        type: "confirm",
                        name: "feeStatus",
                        message: "Confirm Fee Status (Paid/Unpaid):",
                    },
                ]);
                inqAddStd.name = inqAddStd.name.toUpperCase();
                const newStudent = Student.createStudent(inqAddStd.name, parseInt(inqAddStd.age), inqAddStd.feeStatus);
                console.log(`Student ${newStudent.getName()} with ID ${newStudent.getId()} and Roll No ${newStudent.getRollNo()} has been added to the system.`);
                if (inqAddStd.feeStatus != false) {
                    // const courseChoices = ['Metaverse', 'Artificial Intelligence', 'Block Chain'];
                    const courseSelection = await inquirer.prompt([
                        {
                            type: "list",
                            name: "courseName",
                            message: "Assign a course to the student:",
                            choices: readDataforCourse(courseFilePath),
                        },
                    ]);
                    const dataForCourse = readDataforCourse(courseFilePath);
                    const course = dataForCourse.find((course) => course.courseName === courseSelection);
                    newStudent.assignCourse(courseSelection.courseName);
                    newStudent.setCourses(courseSelection.courseName);
                    students.push(newStudent);
                    // After adding a student, save the updated data to the JSON file.
                    writeDataToFile(studentsFilePath, students);
                    console.log(students);
                }
                else {
                    console.log('Fee is unpaid.');
                }
                break;
            case 'Add Instructor':
                console.log('Add Instructor:');
                const inqAddIns = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter instructor's full name."
                    },
                    {
                        type: "number",
                        name: "age",
                        message: "Enter instructor's age."
                    },
                    {
                        type: "number",
                        name: "salary",
                        message: "Enter instructor's salary."
                    }
                ]);
                inqAddIns.name = inqAddIns.name.toUpperCase();
                const newInstructor = Instructor.createInstructor(inqAddIns.name, parseInt(inqAddIns.age), parseInt(inqAddIns.salary));
                console.log(`The Instructor named ${newInstructor.name}
                    aged ${newInstructor.age}
                    years hase been hired on Rs.${newInstructor.salary}/- per month`);
                instructors.push(newInstructor);
                console.log(instructors);
                writeDataforInst(instructorFilePath, instructors);
                break;
            case 'Add Course':
                const inqAddCrs = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'courseId',
                        message: 'Enter course ID.'
                    },
                    {
                        type: 'input',
                        name: 'courseName',
                        message: 'Enter course name.'
                    },
                    {
                        type: 'number',
                        name: 'courseFee',
                        message: 'Enter the fee for this course'
                    },
                    {
                        type: 'list',
                        name: 'courseInstructor',
                        message: 'Select Instructor',
                        choices: readDataforInstructor(instructorFilePath)
                    },
                ]);
                const readInstructorData = readDataforInstructor(instructorFilePath);
                // const dataForCourse = readDataforCourse(courseFilePath);
                const selectedInstructor = inqAddCrs.courseInstructor;
                const instructor = readInstructorData.find((instructor) => instructor.name === selectedInstructor);
                if (instructor) {
                    const newCourse = new Course(inqAddCrs.courseId, inqAddCrs.courseName, inqAddCrs.courseFee);
                    newCourse.setInstructor(instructor);
                    newCourse.coursesForAdmission.push(newCourse.courseName);
                    courses.push(newCourse);
                    console.log(`Course "${newCourse.courseName}" with ID ${newCourse.courseId} has been assigned to Instructor: ${instructor.name}. The fee is Rs. ${newCourse.courseFee}`);
                }
                else {
                    console.log('Instructor not found.');
                }
                writeDataforCourse(courseFilePath, courses);
                break;
            case 'Student Details':
                console.log('Student Details:');
                const choice3 = await inquirer.prompt([
                    {
                        type: "input",
                        name: 'id',
                        message: "Enter the ID of the student:"
                    }
                ]);
                const studentId = choice3.id.toUpperCase(); // Store the ID as a string
                // Read student data from the JSON file.
                const readStudentsData = readDataFromFile(studentsFilePath);
                const student = readStudentsData.find((student) => student.id === studentId);
                if (student) {
                    console.log(`Student Name:`);
                    console.log(student);
                }
                else {
                    console.log('Student not found.');
                }
                break;
            case 'Student Report (SR-101)':
                console.log('Student Report (SR-101)');
                console.log(readDataFromFile('database.json'));
                break;
            case 'Course Report(CR-101)':
                console.log('Course Report (CR-101)');
                const coursesData = readDataforCourse('coursesInq.json');
                if (coursesData.length === 0) {
                    console.log('No courses available.');
                }
                else {
                    coursesData.forEach((course, index) => {
                        console.log(`Course ${index + 1}:`);
                        console.log(`Course ID: ${course.courseId}`);
                        console.log(`Course Name: ${course.courseName}`);
                        console.log(`Course Fee: Rs. ${course.courseFee}`);
                        console.log(`Courses for Admission: ${course.coursesForAdmission.join(', ')}`);
                        console.log(`Instructor: ${course.courseInstructor.name}`);
                        console.log(`Instructor ID: ${course.courseInstructor.id}`);
                        console.log('------------------------');
                    });
                }
                break;
            case 'Instructor Report(IR-101)':
                console.log('Instructor Report (IR-101)');
                console.log(readDataFromFile('instructor.json'));
                break;
            case 'Exit':
                (console.log(chalk.greenBright("Logged out.")),
                    console.log(chalk.yellowBright("Thank you for using D-Lab app.")),
                    process.exit(0));
            default:
                console.log('Invalid Choice! Please select a valid option.');
                break;
        }
    }
}
;
function mainMenus() {
    console.log(chalk.blueBright("D-Lab Institute System")),
        console.log(courses),
        console.log(chalk.greenBright("Powered by:")), console.log(chalk.redBright("D-Lab"));
    main();
}
mainMenus();
