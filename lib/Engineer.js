const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name,id,email);
        this.github = github;
        this.role = "Engineer"
    }

    // Methods to return Engineer role and class specific Github property
    
    getGithub(){
        return this.github;
    }
    
    getRole(){
        return this.role;
    }
}

module.exports = Engineer;