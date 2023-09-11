var mysql = require('mysql');

var con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12645467",
    password: "PV8SAt5yHJ",
    database: "sql12645467"
});
var configureDb = () => {
    var sqls = [
        "CREATE TABLE IF NOT EXISTS users(uid int NOT NULL AUTO_INCREMENT,fname varchar(15),lname varchar(8), email varchar(15) UNIQUE,age int,phone int, PRIMARY KEY(uid));",
        "CREATE TABLE IF NOT EXISTS address(aid int NOT NULL AUTO_INCREMENT, uid integer,block varchar(15),street varchar(10), city varchar(15),state varchar(10),country varchar(10),PRIMARY KEY(aid),FOREIGN KEY(uid) REFERENCES users(uid));"
    ]

    sqls.forEach(sql => {
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("table configured");
        });
    })
}
var connect = (done) => {
    con.connect(function (err) {
        if (err) {
            console.log("database connection failed......")
            throw err;
        }
        configureDb()
        done()
    });
}
module.exports = { con, connect }