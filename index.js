const inquirer = require('inquirer');
const connection = require('./assets/connection.js');

displayLogo()


function displayLogo() {
    console.log('Employee Management System');
}


function startPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "Please make a selection.",
        name: "choice",
        choices: [
            "View Employees",
            "View Employees By Roles",
            "View Emplyees By Deparments",
            "Update Employee",
            "Add Employee",
            "Add Role",
            "Add Department?"
        ]
    }]).then(function(val) {
        switch (val.choice) {
            case "View Employees":
                viewEmployees();
                break;

            case "View Employees By Roles":
                viewRoles();
                break;
            case "View Employees By Deparments":
                viewDepartments();
                break;

            case "Add Employee":
                addingEmployee();
                break;

            case "Update Employee":
                updatingEmployee();
                break;

            case "Add Role":
                addingRole();
                break;

            case "Add Department":
                addingDepartment();
                break;

        }
    })
}

function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
        function(err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}


var roleArr = [];

function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }

    })
    return roleArr;
}

var managersArr = [];

function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}

function addingEmployee() {
    inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "Input first name. "
        },
        {
            name: "lastName",
            type: "input",
            message: "Input last name. "
        },
        {
            name: "role",
            type: "list",
            message: "Enter their role",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Enter their managers name.",
            choices: selectManager()
        }
    ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?", {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId

        }, function(err) {
            if (err) throw err
            console.table(val)
            startPrompt()
        })

    })
}


function updatingEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
        // console.log(res)
        if (err) throw err
        console.log(res)
        inquirer.prompt([{
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "Employee's last name",
            },
            {
                name: "role",
                type: "rawlist",
                message: "Employees new title. ",
                choices: selectRole()
            },
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET ? WHERE ?", {
                last_name: val.lastName,
                role: roleId,
            }, function() {
                if (err) throw err
                startPrompt()
            })

        })
    })

}

function addingRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
        inquirer.prompt([{
                name: "Title",
                type: "input",
                message: "Input Title."
            },
            {
                name: "Salary",
                type: "input",
                message: "Input salary."
            },
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?", {
                    title: res.Title,
                    salary: res.Salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )

        })
    })
}

function addingDepartment() {

    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Whci Department do you want to add?"
    }]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ", {
                name: res.name

            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
}

startPrompt();