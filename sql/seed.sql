-- seed is the value of the first row loaded into the table
-- INSERT INTO adds one or more rows into a table (column_list)
-- VALUES specifies the value/s for each colum in the table (values_list)

USE employeeTracker_db;

-- Departments
INSERT INTO department (name)
VALUES ("Sales"),
INSERT INTO department (name)
VALUES ("Engineering"),
INSERT INTO department (name)
VALUES ("Human Resources"),
INSERT INTO department (name)
VALUES ("Accounting");


-- Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Account Manager", 150000.00, 1),
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 75000.00, 1),
INSERT INTO roles (title, salary, department_id)
VALUES ("Principal Engineer", 190000.00, 2),
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 125000.00, 2),
INSERT INTO roles (title, salary, department_id)
VALUES ("HR Director", 200000.00, 3),
INSERT INTO roles (title, salary, department_id)
VALUES ("HR Administrator", 95000.00, 3),
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead CPA", 110000.00, 4);


-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Higgins", 1, 4),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Cagel", 1, 3),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Johnson", 2, null),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carmen", "Jennings", 2, 6),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rody", "Williams", 3, 2),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Katharine", 3, 8),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Adams", 4, null);

