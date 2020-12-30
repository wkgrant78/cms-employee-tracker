# EmployeeTracker

### PROJECT DESCRIPTION:

Architect and build a solution for managing a company's employees through a Content Management Systems interface, using node, inquirer, and MySQL. This will allow non-developers to view and interact with the information stored in the database.

### ACCEPTANCE CRITERIA/REQUIREMENTS:

* The schema must include the following tables with the respective data:
    * Department:
        - id
        - name
    * Employee role:
        - id
        - title
        - salary
        - department_id
    * Employee:
        - id
        - first_name
        - last_name
        - role_id:
        - manager_id
* The command-line application must allow the user to:
    * Add departments
    * View departments
    * Update employee roles

### DEVELOPMENT PLAN:

* Create repo and initial files, install dependencies
* Create databases using schema.sql and seeds.sql files
* Create server.js - connect to server and sql databases, user prompts, include SQL JOINS to combine rows from database tables (use console.table to print MySQL rows to console)
* Test functionality
* Record functioning app


### COMMITS:

* Initial commit - created repo, .gitignore, README.md, npm installs, server.js, sql folder with blank employeeTrackerDB.sql and seed.sql files
* Created employees_DB with required tables and columns, and seed.sql to insert data into the employees_DB tables
* Setup server connection in .js and updated README.md; added GitHub repo link
* Fixed syntax errors in employeeTrackerDB.sql and seed.sql
* Installed 'promise-mysql' to create connection and added code in server.js - only initial prompt is functioning
* Updated syntax in .sql files
* Function tested CL app - successful
* Tried recording functionality - 'Main Menu' and prompts working, console.tables no longer appearing
* Worked with AskBCS to resolve CL app function issue, re-executed seed.sql file - successful
* Recorded functionality - successful
* Final update to README.md with employeeTracker.gif


### VIDEO OF FUNCTIONING APP:

![](employeeTracker.gif)

### GITHUB URL:

https://github.com/wkgrant78/EmployeeTracker.git

