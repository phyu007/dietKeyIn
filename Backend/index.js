const mysql = require('mysql');
const con = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});
exports.handler = async (event) => {
  con.query("CREATE DATABASE mysqllab", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  return "Database Created"
};