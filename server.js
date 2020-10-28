const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");


// Connection Properties
const connectionProperties = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1Hatedoingthi$",
  database: "employees_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);

// connect to the mysql server and sql database
// throw error if fails to connect
connection.connect(function (err) {
  if (err) throw err;
  // if connects, run "firstPrompt"
  mainMenu();
});

// initial prompt
function mainMenu() {

  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Main Menu",
      choices: [
        "View all employees",
        "View all employees by role",
        "View all employees by department",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
      ]
    })
    .then((answer) => {

      // Switch case depending on user option
      switch (answer.action) {
        case "View all employees":
          viewAllEmp();
          break;

        case "View all employees by department":
          viewAllEmpByDept();
          break;

        case "View all employees by role":
          viewAllEmpByRole();
          break;

        case "Add employee":
          addEmp();
          break;

        case "Add department":
          addDept();
          break;

        case "Add role":
          addRole();
          break;

        case "Update employee role":
          updateEmpRole();
          break;
      }
    });
}

// View all employees 
function viewAllEmp() {
// console.log("line 82") - checking function - good
  // Query to view all employees
  let query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY ID ASC";

  connection.query(query, function (err, res) {
    if (err) return err;
    console.log("\n");
// console.log(res); checking response - good
    console.table(res);

    mainMenu();
  });
}

// View all employees by department
function viewAllEmpByDept() {

  // Set global array to store department names
  let deptArr = [];

  promisemysql.createConnection(connectionProperties
  ).then((conn) => {

    return conn.query('SELECT name FROM department');
  }).then(function (value) {
    deptQuery = value;
    for (i = 0; i < value.length; i++) {
      deptArr.push(value[i].name);
    }
  }).then(() => {

    inquirer.prompt({
      name: "department",
      type: "list",
      message: "Which department would you like to search?",
      choices: deptArr
    })
      .then((answer) => {

        // Employees by selected department
        const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${answer.department}' ORDER BY ID ASC`;
        connection.query(query, (err, res) => {
          if (err) return err;

          console.log("\n");
          console.table(res);

          mainMenu();
        });
      });
  });
}

// view all employees by role
function viewAllEmpByRole() {

  let roleArr = [];

  // Create connection using promise-sql
  promisemysql.createConnection(connectionProperties)
    .then((conn) => {

      return conn.query('SELECT title FROM role');
    }).then(function (roles) {

      for (i = 0; i < roles.length; i++) {
        roleArr.push(roles[i].title);
      }
    }).then(() => {

      inquirer.prompt({
        name: "role",
        type: "list",
        message: "Which role would you like to search?",
        choices: roleArr
      })
        .then((answer) => {

          // Employees by role 
          const query = `SELECT e.id AS ID, e.first_name AS 'First Name', e.last_name AS 'Last Name', role.title AS Title, department.name AS Department, role.salary AS Salary, concat(m.first_name, ' ' ,  m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${answer.role}' ORDER BY ID ASC`;
          connection.query(query, (err, res) => {
            if (err) return err;

            console.log("\n");
            console.table(res);
            mainMenu();
          });
        });
    });
}

// Add employee
function addEmp() {

  let roleArr = [];
  let managerArr = [];

  promisemysql.createConnection(connectionProperties
  ).then((conn) => {

    return Promise.all([
      conn.query('SELECT id, title FROM role ORDER BY title ASC'),
      conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
    ]);
  }).then(([roles, managers]) => {

    for (i = 0; i < roles.length; i++) {
      roleArr.push(roles[i].title);
    }

    for (i = 0; i < managers.length; i++) {
      managerArr.push(managers[i].Employee);
    }

    return Promise.all([roles, managers]);
  }).then(([roles, managers]) => {

    // Null if employee does not have a manager
    managerArr.unshift('--');

    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "First name: ",

        validate: function (input) {
          if (input === "") {
            console.log("First name required");
            return false;
          }
          else {
            return true;
          }
        }
      },
      {
        name: "lastName",
        type: "input",
        message: "Last name: ",

        validate: function (input) {
          if (input === "") {
            console.log("Last name required");
            return false;
          }
          else {
            return true;
          }
        }
      },
      {
        name: "role",
        type: "list",
        message: "What is their role?",
        choices: roleArr
      }, {
        name: "manager",
        type: "list",
        message: "Who is their manager?",
        choices: managerArr
      }])
      .then((answer) => {
        let roleID;
        let managerID = null;

        for (i = 0; i < roles.length; i++) {
          if (answer.role == roles[i].title) {
            roleID = roles[i].id;
          }
        }
        for (i = 0; i < managers.length; i++) {
          if (answer.manager == managers[i].Employee) {
            managerID = managers[i].id;
          }
        }

        // Add employee
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
          if (err) return err;

          // Employee added confirmation
          console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);

          mainMenu();
        });
      });
  });
}

// Add Department
function addDept() {

  inquirer.prompt({

    name: "deptName",
    type: "input",
    message: "Department Name: "
  }).then((answer) => {

    connection.query(`INSERT INTO department (name)VALUES ("${answer.deptName}");`, (err, res) => {
      if (err) return err;
      // Department added confirmation
      console.log("\n DEPARTMENT ADDED...\n ");

      mainMenu();
    });
  });
}

// Add Role
function addRole() {

  let departmentArr = [];

  promisemysql.createConnection(connectionProperties)
    .then((conn) => {

      return conn.query('SELECT id, name FROM department ORDER BY name ASC');

    })
    .then((departments) => {

      for (i = 0; i < departments.length; i++) {
        departmentArr.push(departments[i].name);
      }
      return departments;

    })
    .then((departments) => {

      inquirer.prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "Role title: "
        },
        {
          name: "salary",
          type: "number",
          message: "Salary: "
        },
        {
          name: "dept",
          type: "list",
          message: "Department: ",
          choices: departmentArr
        }
      ])
        .then((answer) => {

          let deptID;

          for (i = 0; i < departments.length; i++) {
            if (answer.dept == departments[i].name) {
              deptID = departments[i].id;
            }
          }
          connection.query(`INSERT INTO role (title, salary, department_id)
                VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
            if (err) return err;
            // Role added confirmation
            console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);

            mainMenu();
          });
        });
    });
}

// Update Employee Role
function updateEmpRole(){

  let employeeArr = [];
  let roleArr = [];

  promisemysql.createConnection(connectionProperties
  ).then((conn) => {
      return Promise.all([

          
          conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
          conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
      ]);
  }).then(([roles, employees]) => {

      for (i=0; i < roles.length; i++){
          roleArr.push(roles[i].title);
      }

      for (i=0; i < employees.length; i++){
          employeeArr.push(employees[i].Employee);
          //console.log(value[i].name);
      }

      return Promise.all([roles, employees]);
  }).then(([roles, employees]) => {

      inquirer.prompt([
          {
              // prompt user to select employee
              name: "employee",
              type: "list",
              message: "Who would you like to edit?",
              choices: employeeArr
          }, {
              // Select role to update employee
              name: "role",
              type: "list",
              message: "What is their new role?",
              choices: roleArr
          },]).then((answer) => {

              let roleID;
              let employeeID;

              /// get ID of role selected
              for (i=0; i < roles.length; i++){
                  if (answer.role == roles[i].title){
                      roleID = roles[i].id;
                  }
              }

              // get ID of employee selected
              for (i=0; i < employees.length; i++){
                  if (answer.employee == employees[i].Employee){
                      employeeID = employees[i].id;
                  }
              }
              
              // update employee with new role
              connection.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${employeeID}`, (err, res) => {
                  if(err) return err;

                  // confirm update employee
                  console.log(`\n ${answer.employee} ROLE UPDATED TO ${answer.role}...\n `);

                  mainMenu();
              });
          });
  });
  
}