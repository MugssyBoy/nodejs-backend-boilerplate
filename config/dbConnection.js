const mysql = require('mysql');

const options = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const connection = mysql.createConnection(options);

connection.connect(err => err ? console.error('db error connecting: ' + err.stack) : console.log('connected as id ' + connection.threadId));

module.exports = connection;