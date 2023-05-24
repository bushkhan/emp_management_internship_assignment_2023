const mysql = require("mysql");


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_data",

});

con.connect((err) => {
    if (err) 
        throw err;
    else
        console.log("Connection created!");
})


module.exports.con=con;