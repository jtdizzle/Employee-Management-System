USE employee_trackerDB;

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150400, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 290000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 175000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 170000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 90000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 125500, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 200000, 4);

-- EMPLOYEE SEED --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Courtney", "Smith", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Patrick", "Albaugh", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mia","Roegner",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Alexis", "Taylor", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Gracie", "Mae", 4, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Zachary", "Jonathan", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Oliver", "Cromwell", 2, 7);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;