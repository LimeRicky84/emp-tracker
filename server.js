const mysql = require('mysql2')
const inquirer = require('inquirer')
const consoleTable = require('console.table')
const express = require('express')

const PORT = process.env.PORT || 8080
// const app = express()

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Passw3rd',
        database: 'employee_db'
    }
)

db.connect(function (err) {
    if (err) throw err;
    init()
})

console.table (
    "~~~-----EMPLOYEE TRACKER-----~~~"
)

const init = async () => {
    try {
        let question = await inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'Main Menu',
            choices: [
                'View Departments, Roles or Employees',
                'Add A Department, Role or Employee',
                'Update An Employee Role or Manager',
                'Delete A Department, Role or Employee',
                'Exit Program'
            ]
        })

        switch (question.menu) {
            case 'View Departments, Roles or Employees':
                viewsMenu();
                break;
            case 'Add A Department, Role or Employee':
                addsMenu();
                break;
            case 'Update An Employee Role or Manager':
                updateMenu();
                break;
            case 'Delete A Department, Role or Employee':
                deleteMenu();
                break;
            case 'Exit Program':
                db.end();
                break;
        }
    } 
    catch (err) {
        console.log(err);
        init()
    }
}

const viewsMenu = async () => {
    try {
        let question = await inquirer.prompt({
            type: "list",
            name: "views",
            message: "Choose a Database View",
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Previous Menu'
            ]
        })

        switch (question.views) {
            case 'View Departments':
                deptView();
                break;
            case 'View Roles':
                roleView();
                break;
            case 'View Employees':
                empView();
                break;
            case 'Previous Menu':
                init();
                break;
        }
    }
    catch (err) {
        console.log(err);
        viewsMenu()
    }
}

const addsMenu = async () => {
    try {
        let question = await inquirer.prompt({
            type: "list",
            name: "adds",
            message: "Choose Which to Add",
            choices: [
                'Add Departments',
                'Add Roles',
                'Add Employees',
                'Previous Menu'
            ]
        })

        switch (question.adds) {
            case 'Add Departments':
                deptAdd();
                break;
            case 'Add Roles':
                roleAdd();
                break;
            case 'Add Employees':
                empAdd();
                break;
            case 'Previous Menu':
                init();
                break;
        }
    }
    catch (err) {
        console.log(err);
        addsMenu()
    }
}

const updateMenu = async () => {
    try {
        let question = await inquirer.prompt({
            type: "list",
            name: "updates",
            message: "Choose Which to Update",
            choices: [
                'Update an Employee Role',
                'Update an Employee Manager',
                'Previous Menu'
            ]
        })

        switch (question.updates) {
            case 'Update an Employee Role':
                updateRole();
                break;
            case 'Update an Employee Manager':
                updateManager();
                break;
            case 'Previous Menu':
                init();
                break;
        }
    }
    catch (err) {
        console.log(err);
        updateMenu()
    }
}

const deleteMenu = async () => {
    try {
        let question = await inquirer.prompt({
            type: "list",
            name: "delete",
            message: "Choose Which to Delete",
            choices: [
                'Delete A Department',
                'Delete A Role',
                'Delete An Employee',
                'Previous Menu'
            ]
        })

        switch (question.delete) {
            case 'Delete A Department':
                deptDelete();
                break;
            case 'Delete A Role':
                roleDelete();
                break;
            case 'Delete An Employee':
                empDelete();
                break;
            case 'Previous Menu':
                init();
                break;
        }
    }
    catch (err) {
        console.log(err);
        deleteMenu()
    }
}

const deptView = async () => {
    console.log ('Department View')
    try {
        let query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            let departmentList = []
            res.forEach(department => departmentList.push(department))
            console.table(departmentList)
            viewsMenu()
        })
    }
    catch (err) {
        console.log(err)
        init()
    }
}

const roleView = async () => {
    console.log ('Role View')
    try {
        let query = 'SELECT * FROM Role';
        db.query(query, function (err, res) {
            if (err) throw err;
            let roleList = []
            res.forEach(role => roleList.push(role))
            console.table(roleList)
            viewsMenu()
        })
    }
    catch (err) {
        console.log(err)
        init()
    }
}

const empView = async () => {
    console.log ('Employee View')
    try {
        let query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            let employeeList = []
            res.forEach(employee => employeeList.push(employee))
            console.table(employeeList)
            viewsMenu()
        })
    }
    catch (err) {
        console.log(err)
        init()
    }
}
// view all departments,

// view all roles,

// view all employees, 

// add a department,

// add a role, 

// add an employee

// update an employee role

// Bonus: Update employee managers

// Bonus: View employees by manager

// Bonus: View employees by department

// Bonus: Delete departments, roles and employees

// Bonus: View total combined salaries in a department