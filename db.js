// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "tehnikatestDb"
// });

// // con.connect(function(err) {
// //   if (err){
// //        console.log(err);
// //     }var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "tehnikatestDb"
// });

// // con.connect(function(err) {
// //   if (err){
// //        console.log(err);
// //     }
// //   console.log("Connected!");
// //   con.query("CREATE DATABASE carsijaTehnika", function (err, result) {
// //     if (err){
// //         console.log(err);
// //      }
// //     console.log("Database created");
// //   });
// // });

// con.connect(function(err) {
//     if (err){
//         console.log(err);
//       } ;
//   console.log("Connected!");
//   var sql = "CREATE TABLE bijela_tehnika (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price DECIMAL(6,2), url VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err){
//         console.log(err);
//       } ;
//     console.log("Table created");
//   });
// });

// con.connect(function(err) {
//   if (err){
//     console.log(err);
//   } ;
//   console.log("Connected!");
//   var sql = "INSERT INTO bijela_tehnika (name, price, url) VALUES ?";
//   var values = [
//     // upisati niz vrednosti ovdje
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
// });

// module.exports = connection;
// //   console.log("Connected!");
// //   con.query("CREATE DATABASE carsijaTehnika", function (err, result) {
// //     if (err){
// //         console.log(err);
// //      }
// //     console.log("Database created");
// //   });
// // });

// con.connect(function(err) {
//     if (err){
//         console.log(err);
//       } ;
//   console.log("Connected!");
//   var sql = "CREATE TABLE bijela_tehnika (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price DECIMAL(6,2), url VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err){
//         console.log(err);
//       } ;
//     console.log("Table created");
//   });
// });

// con.connect(function(err) {
//   if (err){
//     console.log(err);
//   } ;
//   console.log("Connected!");
//   var sql = "INSERT INTO bijela_tehnika (name, price, url) VALUES ?";
//   var values = [
//     // upisati niz vrednosti ovdje
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
// });

// module.exports = connection;