#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class StudentModel {
    name;
    rollNumber;
    constructor(name, rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }
}
class SubjectModel {
    name;
    marks;
    maxMarks;
    constructor(name, marks, maxMarks) {
        this.name = name;
        this.marks = marks;
        this.maxMarks = maxMarks;
    }
}
// MarksSheet.ts
class MarksSheet {
    student;
    subjects;
    totalMarks;
    percentage;
    constructor(student) {
        this.student = student;
        this.subjects = [];
        this.totalMarks = 0;
        this.percentage = 0;
    }
    addSubject(subject) {
        this.subjects.push(subject);
        this.calculateTotalMarks();
        this.calculatePercentage();
    }
    getStudent() {
        return this.student;
    }
    getSubjects() {
        return this.subjects;
    }
    getTotalMarks() {
        return this.totalMarks;
    }
    getPercentage() {
        return this.percentage;
    }
    calculateTotalMarks() {
        this.totalMarks = this.subjects.reduce((acc, current) => acc + current.marks, 0);
    }
    calculatePercentage() {
        const totalMaxMarks = this.subjects.reduce((acc, current) => acc + current.maxMarks, 0);
        this.percentage = (this.totalMarks / totalMaxMarks) * 100;
    }
}
// Main.ts
async function main() {
    const studentName = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter student name:",
        },
    ]);
    const studentRollNumber = await inquirer.prompt([
        {
            name: "rollNumber",
            type: "input",
            message: "Enter student roll number:",
        },
    ]);
    const student = new StudentModel(studentName.name, parseInt(studentRollNumber.rollNumber));
    const marksSheet = new MarksSheet(student);
    while (true) {
        const action = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "Choose an action:",
                choices: [
                    "Add Subject",
                    "View Marks Sheet",
                    "Exit",
                ],
            },
        ]);
        switch (action.action) {
            case "Add Subject":
                const subjectName = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter subject name:",
                    },
                ]);
                const subjectMarks = await inquirer.prompt([
                    {
                        name: "marks",
                        type: "input",
                        message: "Enter subject marks:",
                    },
                ]);
                const subjectMaxMarks = await inquirer.prompt([
                    {
                        name: "maxMarks",
                        type: "input",
                        message: "Enter subject max marks:",
                    },
                ]);
                const subject = new SubjectModel(subjectName.name, parseInt(subjectMarks.marks), parseInt(subjectMaxMarks.maxMarks));
                marksSheet.addSubject(subject);
                break;
            case "View Marks Sheet":
                console.log(chalk.bold.red(`Student Name: ${marksSheet.getStudent().name}`));
                console.log(chalk.bold.green(`Student Roll Number: ${marksSheet.getStudent().rollNumber}`));
                console.log(chalk.bold.yellow(`###### Subjects:###### `));
                marksSheet.getSubjects().forEach((subject) => {
                    console.log(chalk.bold.red(`Name: ${subject.name}`));
                    console.log(chalk.bold.yellow(`SubjectMarks:  ${subject.marks}/${subject.maxMarks}`));
                });
                console.log(chalk.bold.green(`Total Marks: ${marksSheet.getTotalMarks()}`));
                console.log(chalk.bold.red(`Percentage: ${marksSheet.getPercentage()}%`));
                break;
            case "Exit":
                return;
        }
    }
}
main();
