-- seed is the value of the first row loaded into the table
-- INSERT INTO adds one or more rows into a table (column_list)
-- VALUES specifies the value/s for each colum in the table (values_list)

USE employees_DB;

------- Departments -------


INSERT INTO department (id, name)
VALUES (1, "Sales");

INSERT INTO department (id, name)
VALUES (2, "Engineering");

INSERT INTO department (id, name)
VALUES (3, "Human Resouces");

INSERT INTO department (id, name)
VALUES (4, "Accounting");




------- Role -------
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Account Manager", 150000, 1);
INSERT INTO Role (id, title, salary, department_id)
VALUES (2, "Sales Associate", 75000, 1);
INSERT INTO Role (id, title, salary, department_id)
VALUES (3, "Principal Engineer", 190000, 2);
INSERT INTO Role (id, title, salary, department_id)
VALUES (4, "Software Engineer", 125000, 2);
INSERT INTO Role (id, title, salary, department_id)
VALUES (5, "HR Director", 200000, 3);
INSERT INTO Role (id, title, salary, department_id)
VALUES (6, "HR Administrator", 95000, 3);
INSERT INTO Role (id, title, salary, department_id)
VALUES (7, "Lead CPA", 110000, 4);
INSERT INTO Role (id, title, salary, department_id)
VALUES (8, "Accounts Payable", 60000, 4);


------- Employees -------
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Jane", "Higgins", 1, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Steve", "Cagel", 2, 8);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mark", "Johnson", 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Carmen", "Jennings", 4, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Rody", "Williams", 5, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Mary", "Katharine", 6, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "John", "Adams", 7, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Matt", "Cole", 8, 7);

