const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name,id,email);
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole(){
        return this.role;
    }

    // Method to return Manager role and class specific officeNumber property
}

module.exports = Manager;