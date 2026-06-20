const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user:'nodepractice',
    password:'node*123P',
    database:'productdb'
});
connection.connect((err) =>{
    if(err){
        console.log("database connection failed");
        console.error(err);
        return;
    }
    console.log("database connected successfully");
});
module.exports = connection;