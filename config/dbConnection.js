const mysql = require('mysql');

const options = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    queueLimit: 0,
    acquireTimeout: 10000,
    waitForConnections: true,
    multipleStatements: true,
};

const pool = mysql.createPool(options);

pool.getConnection((err, connection) => {
 if (err) {
     if(err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error('Database connection was closed')
     }
     if(err.code === "ER_CON_COUNT_ERROR") {
      console.error('Database has too many connections.')
     }
     if(err.code === "ECONREFUSED") {
      console.error('Database connection was released.')
     }
 }
        return connection
})

module.exports = pool;
