const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "1Hatedoingthi$",
    database: "employeeTracker_db"
  });

  // connect to the mysql server and sql database
  // throw error if fails to connect
  connection.connect(function (err) {
    if (err) throw err;
    // if successfully connects, run "firstPrompt" function
    firstPrompt();
  });

  // initial prompt asking what user wants to do
  function firstPrompt() {

    
  }