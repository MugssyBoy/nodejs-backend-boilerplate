const db = require('./dbConnection');
const { hasher } = require('pcypher');

module.exports = {
    createUser: params => new Promise((resolve, reject) => {
        let { email, username, password } = params;
        let hashedPassword = await hasher(password); 
        let sql = `INSERT INTO users (email, username, password) VALUES ("${email}", "${username}", "${hashedPassword}")`;
        let query = (sql, (err, rows, fields) => resolve(rows));
    }),
    findUserByEmail: params => new Promise((resolve, reject) => {
        let { email } = params;
        let sql = `SELECT * FROM users WHERE email = "${email}"`;
        let query = (sql, (err, rows, fields) => resolve(rows));
    })
};