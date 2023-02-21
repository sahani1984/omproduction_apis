const mysql  = require('mysql');
// const connection  =  mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Durgesh$41084",
//     database:"durgeshdb",
// })

const connection  =  mysql.createConnection({
    host:"184.168.115.25",
    port:3306,
    user:"sahani1984",
    password:"Durgesh$41084",
    database:"omproduction_db",
})
//
module.exports = connection;




