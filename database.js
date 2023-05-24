const {
    createPool
} = require('mysql');


const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_data",
    connectionLimit: 10
})


pool.query()
