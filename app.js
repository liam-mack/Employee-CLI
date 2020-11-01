const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const axios = require("axios")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

const letters = /^[A-Za-z\s]*$/;
const digits = /^[0-9]+$/;
const emailSyntax = /\S+@\S+\.\S+/;

let employees = [];

// Inquirer input validation
const basicValid = async (input) => {
    if (input == ""){
        return "Invalid input. Message: Github is empty"
    } else {
        return true
    }
}

const validName = async (input) => {
    if (input == "" ){
        return "Invalid input. Message: name is empty"
    } else if (!input.match(letters)){
        return "Invalid input. Message: name can only contain letters"
    } else {
        return true
    }  
}

const validID = async (input) => {
    if (input == "" ){
        return "Invalid input. Message: ID is empty"
    } else if (employees.find(employee => employee.id == input)){
        return "Invalid input. Message: ID must be unique"
    } else if (!input.match(digits)){
        return "Invalid input. Message: ID can only contain numbers"
    } else {
        return true
    }
}

const validOffice = async (input) => {
    if (input == "" ){
        return "Invalid input. Message: ID is empty"
    } else if (!input.match(digits)){
        return "Invalid input. Message: ID can only contain numbers"
    } else {
        return true
    }
}

const validEmail = async (input) => {
    if (input == "" ){
        return "Invalid input. Message: Email is empty"
    } else if (employees.find(employee => employee.email == input)){
        return "Invalid input. Message: Email must be unique"
    } else if (!input.match(emailSyntax)){
        return "Invalid input. Message: Invalid email address"
    } else {
        return true
    }
}

const validSchool = async (input) => {
    if (input == "" ){
        return "Invalid input. Message: school is empty"
    } else if (!input.match(letters)){
        return "Invalid input. Message: school can only contain letters"
    } else {
        return true
    }  
}

// Role specific questions
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the manager?",
        validate: validName         
    },
    {
        type: "input",
        name: "id",
        message: "Manager Employee ID: ",
        validate: validID
    },
    {
        type: "input",
        name: "email",
        message: "Manager email address: ",
        validate: validEmail
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Manager office number: ",
        validate: validOffice
    }
]

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Engineer name: ",
        validate: validName         
    },
    {
        type: "input",
        name: "id",
        message: "Engineer Employee ID: ",
        validate: validID
    },
    {
        type: "input",
        name: "email",
        message: "Engineer email address: ",
        validate: validEmail
    },
    {
        type: "input",
        name: "github",
        message: "Engineer github account: ",
        validate: basicValid
    }
]

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "Intern name: ",
        validate: validName         
    },
    {
        type: "input",
        name: "id",
        message: "Intern Employee ID: ",
        validate: validID
    },
    {
        type: "input",
        name: "email",
        message: "Intern email address: ",
        validate: validEmail
    },
    {
        type: "input",
        name: "school",
        message: "Intern school: ",
        validate: validSchool
    }
]



// Functions that populate new classes based on inquirer responses
const createManager = ()=>{
    inquirer.prompt(managerQuestions).then(async(answers) => {
        try {
            const res = await axios.get("https://randomuser.me/api");
            const profImg = res.data.results[0].picture.large
            
            employees.push(new Manager( answers.name, answers.id, answers.email, answers.officeNumber,profImg));
            console.log(profImg)
            teamCreate()
        } catch (err){
            console.log(err)
        }
    })
}

const createEngineer = ()=>{
    inquirer.prompt(engineerQuestions).then((answers) => {
        employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
        teamCreate()
    })
}

const createIntern = ()=>{
    inquirer.prompt(internQuestions).then((answers) => {
        employees.push(new Intern(answers.name, answers.id, answers.email, answers.school));
        teamCreate()
    })
}

// Prompt that determines whether application calls on function to render html or add new employee
const teamCreate = async () => {
    inquirer.prompt([{
        type: "list",
        name: "role",
        message: "Would you like to add another employee?",
        choices: [
            "Engineer",
            "Intern",
            "No. Render my directory"
        ]
    }]).then((response) => {
        if (response.role == "Engineer") {
            createEngineer();
        } else if (response.role == "Intern") {
            createIntern();
        } else {
            fs.writeFileSync(outputPath, render(employees));
        }
    })
}

// Start application by creating company manager
createManager();
