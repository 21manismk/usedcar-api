let mysql =require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abcdef',
    database: 'usedcarss'
});

module.exports = connection; 