import readlineSync from 'readline-sync';
import fs from 'fs';
// Initialize data
let students = [];
let courses = [];
// Load data from JSON file
function loadData() {
    try {
        const studentData = fs.readFileSync('students.json', 'utf-8');
        students = JSON.parse(studentData);
        const courseData = fs.readFileSync('courses.json', 'utf-8');
        courses = JSON.parse(courseData);
    }
    catch (error) {
        console.error('Error loading data from JSON file:', error);
    }
}
// Save data to JSON file
function saveData() {
    try {
        fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
        fs.writeFileSync('courses.json', JSON.stringify(courses, null, 2));
        console.log('Data saved to JSON files.');
    }
    catch (error) {
        console.error('Error saving data to JSON file:', error);
    }
}
// Function to add a new student
function addStudent() {
    {
        const id = `S${students.length + 1}`;
        const name = readlineSync.question('Enter student name: ');
        const contact = readlineSync.question('Enter contact information: ');
        const enrolledCourses = readlineSync.question('Enter Course Code: ');
        const feeStatus = readlineSync.question('Fee Status:');
        students.push({ id, name, contact, enrolledCourses: [], feeStatus: new Map() });
        console.log(`Student added with ID: ${id}\n`);
    }
    saveData(); // Save updated data to JSON file
}
// Function to add a new course
function addCourse() {
    {
        const code = readlineSync.question('Enter course code: ').toLowerCase();
        const name = readlineSync.question('Enter course name: ');
        const description = readlineSync.question('Enter course description: ');
        const fee = parseFloat(readlineSync.question('Enter course fee: '));
        const dueDate = readlineSync.question('Enter due date (YYYY-MM-DD): '); // Prompt for due date
        courses.push({ code, name, description, fee, dueDate });
        console.log(`Course added with code: ${code}\n`);
    }
    saveData(); // Save updated data to JSON file
}
//Student Details
// Function to get student details by ID
function getStudentDetailsById() {
    const studentId = readlineSync.question('Enter Student ID: ').toLowerCase(); // Convert user input to lowercase
    const student = students.find((s) => s.id.toLowerCase() === studentId); // Convert each student's ID to lowercase for comparison
    if (student) {
        console.log(`Student ID: ${student.id}`);
        console.log(`Student Name: ${student.name}`);
        console.log(`Contact Information: ${student.contact}`);
        if (student.enrolledCourses.length > 0) {
            console.log('Enrolled Courses:');
            student.enrolledCourses.forEach((course) => {
                console.log(`  Course Code: ${course.code}`);
                console.log(`  Course Name: ${course.name}`);
                console.log(`  Course Description: ${course.description}`);
                console.log(`  Course Fee: $${course.fee}`);
                console.log(` Fee Status: `);
            });
        }
        else {
            console.log('Student is not enrolled in any courses.');
        }
        // Display fee status
        console.log('Fee Status:');
        if (student.feeStatus.size > 0) {
            student.feeStatus.forEach((status, courseCode) => {
                console.log(`- Course: ${courseCode}`);
                console.log(`  Fee Amount: $${status.feeAmount}`);
                console.log(`  Due Date: ${status.dueDate}`);
            });
        }
        else {
            console.log('No fee status data available.');
        }
    }
    else {
        console.log('Student not found.');
    }
}
// Function to enroll a student in a course
function enrollStudentInCourse() {
    {
        const studentId = readlineSync.question('Enter student ID: ');
        const courseCode = readlineSync.question('Enter course code: ');
        const selectedStudent = students.find((student) => student.id.toLowerCase() === studentId.toLowerCase());
        const selectedCourse = courses.find((course) => course.code.toLowerCase() === courseCode.toLowerCase());
        if (!selectedStudent || !selectedCourse) {
            console.log('Student or course not found.');
            return;
        }
        selectedStudent.enrolledCourses.push(selectedCourse);
        console.log(`${selectedStudent.name} enrolled in ${selectedCourse.name}\n`);
    }
    saveData(); // Save updated data to JSON file
}
// Function to record fee payment for a course
function recordFeePayment() {
    {
        const studentId = readlineSync.question('Enter student ID: ');
        const courseCode = readlineSync.question('Enter course code: ');
        const selectedStudent = students.find((student) => student.id.toLowerCase() === studentId.toLowerCase());
        const selectedCourse = courses.find((course) => course.code.toLowerCase() === courseCode.toLowerCase());
        if (!selectedStudent || !selectedCourse) {
            console.log('Student or course not found.');
            return;
        }
        const dueDate = new Date(selectedCourse.dueDate);
        const currentDate = new Date();
        if (currentDate > dueDate) {
            console.log('Due date passed. Please contact administration.');
            return;
        }
        const feeAmount = parseFloat(readlineSync.question('Enter fee amount: '));
        const paymentDate = new Date().toLocaleDateString(); // Get current date
        selectedStudent.feeStatus.set(selectedCourse.code, { feeAmount, dueDate: paymentDate });
        console.log(`Fee payment recorded for ${selectedStudent.name} in ${selectedCourse.name}\n`);
    }
    saveData(); // Save updated data to JSON file
}
// Main menu
function mainMenu() {
    while (true) {
        console.log('Main Menu');
        console.log('1. Add Student');
        console.log('2. Add Course');
        console.log('3. Enroll Student in Course');
        console.log('4. Record Fee Payment');
        console.log('5. Student Details');
        console.log('6. Exit');
        const choice = readlineSync.question('Choose an option: ');
        switch (choice) {
            case '1':
                addStudent();
                break;
            case '2':
                addCourse();
                break;
            case '3':
                enrollStudentInCourse();
                break;
            case '4':
                recordFeePayment();
                break;
            case '5':
                getStudentDetailsById();
                break;
            case '6':
                return;
            default:
                console.log('Invalid choice. Please try again.\n');
        }
    }
}
// Entry point
function main() {
    console.log('Student Management System');
    mainMenu();
}
// Start the program
main();
