let mysql =require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcdef',
    database: 'new_project'
});

module.exports = connection; 