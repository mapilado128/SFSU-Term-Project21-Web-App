const mysql = require('mysql2');

const pool = mysql.creatPool({
    /**
     * put database info
     * 
     * connectionLimit: 50,
     * host: 'localhost',
     * user: 'photoapp",
     * password: '',
     * database: '',
     * //debug: true
     */
});

const promisePool = pool.promise();

module.exports = promisePool;