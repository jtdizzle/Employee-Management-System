const mysql = require("mysql2");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "69Mudboots!",
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected id " + connection.threadId + "\n");
});

module.exports = connection;