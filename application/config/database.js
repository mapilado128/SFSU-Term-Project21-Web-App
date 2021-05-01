const mysql = require('mysql2');

const pool = mysql.createPool({
    host:"localhost",
    user:"notinstagram",
    password:"Impasta123abcd",
    database:"MAcsc317db",
    connectionLimit: 50,
    debug: false,
});

const promisePool = pool.promise();

module.exports = promisePool;