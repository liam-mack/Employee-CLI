const Employee = require("./Employee")

class Intern extends Employee {
    constructor(name,id,email,school) {
        super(name,id,email);
        this.school = school;
        this.role = "Intern";
    }

    // Method to return Intern role and class specific school property

    getSchool(){
        return this.school;
    }

    getRole(){
        return this.role;
    }
}

module.exports = Intern;