const mysql = require("mysql2");
const bluebird = require("bluebird");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require("express");
const { response } = require("express");
const plus = require('./routes/adds')
const minus = require('./routes/deletes')
const menus = require('./routes/menus')
const update = require('./routes/updates')
const viewed = require('./routes/views')

const PORT = process.env.PORT || 8080;
// const app = express()

// Create a connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passw3rd",
  database: "employee_db",
});

// Call app start
db.connect(function (err) {
  if (err) throw err;
  init();
});

console.table("~~~-----EMPLOYEE TRACKER-----~~~");

// Main menu function
const init = async () => {
  try {
    let question = await inquirer.prompt({
      type: "list",
      name: "menu",
      message: "Main Menu",
      choices: [
        "View Departments, Roles or Employees",
        "Add A Department, Role or Employee",
        "Update An Employee's Role or Manager",
        "Delete A Department, Role or Employee",
        "Exit Program",
      ],
    });

    switch (question.menu) {
      case "View Departments, Roles or Employees":
        viewsMenu();
        break;
      case "Add A Department, Role or Employee":
        addsMenu();
        break;
      case "Update An Employee's Role or Manager":
        console.log("go to update menu")
        updateMenu();
        break;
      case "Delete A Department, Role or Employee":
        deleteMenu();
        break;
      case "Exit Program":
        db.end();
        break;
    }
  } catch (err) {
    console.log(err.message);
    init();
  }
};

// View menu function
const viewsMenu = async () => {
  try {
    let question = await inquirer.prompt({
      type: "list",
      name: "views",
      message: "Choose a Database View",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Previous Menu",
      ],
    });

    switch (question.views) {
      case "View Departments":
        deptView();
        break;
      case "View Roles":
        roleView();
        break;
      case "View Employees":
        empView();
        break;
      case "Previous Menu":
        init();
        break;
    }
  } catch (err) {
    console.log(err.message);
    viewsMenu();
  }
};

// Addition menu function
const addsMenu = async () => {
  try {
    let question = await inquirer.prompt({
      type: "list",
      name: "adds",
      message: "Choose Which to Add",
      choices: [
        "Add Departments",
        "Add Roles",
        "Add Employees",
        "Previous Menu",
      ],
    });

    switch (question.adds) {
      case "Add Departments":
        deptAdd();
        break;
      case "Add Roles":
        roleAdd();
        break;
      case "Add Employees":
        empAdd();
        break;
      case "Previous Menu":
        init();
        break;
    }
  } catch (err) {
    console.log(err.message);
    addsMenu();
  }
};

// Update menu function
const updateMenu = async () => {
  try {
    let question = await inquirer.prompt({
      type: "list",
      name: "updates",
      message: "Choose Which to Update",
      choices: [
        "Update an Employee Role",
        "Update an Employee Manager",
        "Previous Menu",
      ],
    });

    switch (question.updates) {
      case "Update an Employee Role":
        updateRole();
        break;
      case "Update an Employee Manager":
        updateManager();
        break;
      case "Previous Menu":
        init();
        break;
    }
  } catch (err) {
    console.log(err.message);
    updateMenu();
  }
};

// Delete menu function
const deleteMenu = async () => {
  try {
    let question = await inquirer.prompt({
      type: "list",
      name: "delete",
      message: "Choose Which to Delete",
      choices: [
        "Delete A Department",
        "Delete A Role",
        "Delete An Employee",
        "Previous Menu",
      ],
    });

    switch (question.delete) {
      case "Delete A Department":
        deptDelete();
        break;
      case "Delete A Role":
        roleDelete();
        break;
      case "Delete An Employee":
        empDelete();
        break;
      case "Previous Menu":
        init();
        break;
    }
  } catch (err) {
    console.log(err.message);
    deleteMenu();
  }
};

// View department table
const deptView = async () => {
  console.log("Department View");
  try {
    let query = "SELECT * FROM department";
    db.query(query, function (err, res) {
      if (err) throw err;
      let departmentList = [];
      res.forEach((department) => departmentList.push(department));
      console.table(departmentList);
      viewsMenu();
    });
  } catch (err) {
    console.log(err.message);
    init();
  }
};

// View role table
const roleView = async () => {
  console.log("Role View");
  try {
    let query = "SELECT * FROM Role";
    db.query(query, function (err, res) {
      if (err) throw err;
      let roleList = [];
      res.forEach((role) => roleList.push(role));
      console.table(roleList);
      viewsMenu();
    });
  } catch (err) {
    console.log(err.message);
    init();
  }
};

// View employee table
const empView = async () => {
  console.log("Employee View");
  try {
    let query = "SELECT * FROM employee";
    db.query(query, function (err, res) {
      if (err) throw err;
      let employeeList = [];
      res.forEach((employee) => employeeList.push(employee));
      console.table(employeeList);
      viewsMenu();
    });
  } catch (err) {
    console.log(err.message);
    init();
  }
};

// Add a department
const deptAdd = async () => {
  console.log("Add a Department");
  try {
    let depo = await inquirer.prompt([
      {
        type: "input",
        name: "depoName",
        message: "Name of the new department",
      },
    ]);
    answer = db.query("INSERT INTO department SET ?", {
      department_name: depo.depoName,
    });
    console.log(`${depo.depoName} successfully added to departments.\n`);
    addsMenu();
  } catch (err) {
    console.log(err.message);
    addsMenu();
  }
};

// Add a role
const roleAdd = async () => {
  console.log("Add a Role");
  try {
    db.query("SELECT * FROM department;", async (err, res) => {
      let departments = res.map((department) => ({
        name: department.department_name,
        value: department.id,
      }));
    
      if (err) throw err;

      let job = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Name of the new role",
        },
        {
          type: "input",
          name: "salary",
          message: "Salary for this role",
        },
        {
          type: "list",
          name: "deptId",
          message: "Department ID associated with this role",
          choices: departments,
        },
      ]);
      answers = db.query("INSERT INTO role SET ?", {
        title: job.title,
        salary: job.salary,
        department_id: job.deptId,
      });
      console.log(`${job.title} role successfully added.\n`);
      addsMenu();
    });
  } catch (err) {
    console.log(err.message);
    addsMenu();
  }
};

// Add an employee
const empAdd = async () => {
  console.log("Add an employee");
  try {
    db.query("SELECT * FROM role;", (err, res) => {
      if (err) throw err;
      let roles = res.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      db.query("SELECT * FROM employee;", async (err, res) => {
        if (err) throw err;
        let employees = res.map((employee) => ({
          name: employee.first_name = " " + employee.last_name,
          value: employee.id,
        }));
        let staff = await inquirer.prompt([
          {
            type: "input",
            name: "fName",
            message: "First name of new employee",
          },
          {
            type: "input",
            name: "lName",
            message: "Last name of new employee",
          },
          {
            type: "list",
            name: "role",
            message: "Title of new employee",
            choices: roles,
          },
          {
            type: "list",
            name: "manager",
            message: "Manager of the new employee",
            choices: employees,
          },
        ]);
        answers = db.query("INSERT INTO employee SET ?", {
          first_name: staff.fName,
          last_name: staff.lName,
          role_id: staff.role,
          manager_id: staff.manager,
        });
        console.log(
          `${staff.fName} ${staff.lName} successfully added to employee roster`
        );
        addsMenu();
      });
    });
  } catch (err) {
    console.log(err.message);
    addsMenu();
  }
};

// Update a role
const updateRole = async () => {
    console.log('Update an employee')
    try {
      db.query('SELECT * FROM role;', (err, res) => {
        // console.log('roles: ', res)

        let roleChoices = res.map(role => ({name: role.title, value: role.role_id}))
        db.query('SELECT * FROM employee;', async (e, r) => {

          // console.log('employees: ', r)

          let employeeChoices = r.map(employee => ({name: employee.first_name = " " + employee.last_name, value: employee.id}))

          let newRole = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Choose employee to update role for',
                choices: employeeChoices
            },{
                type: 'list',
                name: 'nRole',
                message: 'Choose a new role for employee',
                choices: roleChoices
            }
        ])
        // console.log('newRole: ', newRole)
         db.query ('UPDATE employee SET ? WHERE ?',
        [
            {
                role_id: newRole.nRole,
            },{
                id: newRole.employee
            },
        ], (er, re) => {
          // console.log('answers: ', re)
          console.log ('Role successfully updated.\n')
          updateMenu()
        })
        })
      })   
    } catch (err) {
        console.log(err.message)
        updateMenu()
    }
}

// **Extra Credit** - Update employee's manager
const updateManager = async () => {
    console.log(`Update an employee's manager`)
    try {
        db.query('SELECT * FROM employee;', async (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name = " " + employee.last_name, value: employee.id}));
            let newManager = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose employee to update the manager for',
                    choices: employees
                },{
                    type: 'list',
                    name: 'newManager',
                    message: 'Choose their new manager',
                    choices: employees
                }
            ])
            answers = db.query ('UPDATE employee SET ? WHERE ?',
            [
                {
                    manager_id: newManager.newManager,
                },{
                    id: newManager.employee,
                },
            ])
            console.log('Manager successfully updated.\n')
            updateMenu()
        })
    } catch (err) {
        console.log(err.message)
        updateMenu()
    }
}

// **Extra Credit** - Delete a department
const deptDelete = () => {
    console.log('Delete a department')
    try {
        db.query('SELECT * FROM department ORDER BY id ASC;', async (err, res) => {
            if (err) throw err;
            let departments = res.map(department => ({name: department.department_name, value: department.id}))
            let deletedDept = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptName',
                    message: 'Choose a department to remove',
                    choices: departments
                }    
            ])
            answers = db.query ('DELETE FROM department WHERE ?',
            [
                {
                    id: deletedDept.deptName,
                }
            ])
            console.log('Department successfully deleted.\n')
            deleteMenu()    
        })
    } catch (err) {
        console.log(err.message)
        deleteMenu()
    }
}

// **Extra Credit** - Delete a role
const roleDelete = async () => {
    console.log('Delete a role')
    try {
        db.query('SELECT * FROM role ORDER BY id ASC;', async (err, res) => {
            if (err) throw err;
            let roles = res.map(role => ({name: role.title, value: role.id}))
            let deletedRole = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'title',
                    message: 'Choose a role to remove',
                    choices: roles
                }    
            ])

            answers = db.query ('DELETE FROM role WHERE ?',
            [
                {
                    id: deletedRole.title,
                }
            ])
            console.log('Role successfully deleted.\n')
            deleteMenu()    
        })
    } catch (err) {
        console.log(err.message)
        deleteMenu()
    }
}

// **Extra Credit** - Delete an employee
const empDelete = async () => {
    console.log('Delete an employee')
    try {
        db.query('SELECT * FROM employee ORDER BY id ASC;', async (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}))
            let deletedEmp = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Choose an employee to remove',
                    choices: employees
                }    
            ])

            answers = db.query ('DELETE FROM employee WHERE ?',
            [
                {
                    id: deletedEmp.employee,
                }
            ])
            console.log('Employee successfully deleted.\n')
            deleteMenu()    
        })
    } catch (err) {
        console.log(err.message)
        updateMenu()
    }
}