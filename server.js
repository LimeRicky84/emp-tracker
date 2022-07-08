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
        password: '',
        database: 'employee_db'
    }
)

console.table (
    "-----EMPLOYEE TRACKER-----"
)



// Bonus: Update employee managers

// Bonus: View employees by manager

// Bonus: View employees by department

// Bonus: Delete departments, roles and employees

// Bonus: View total combined salaries in a department