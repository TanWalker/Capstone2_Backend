
let mysql = require('mysql');
let config = require('config');
require('dotenv').config();

function exec_Procedure(query , params) {
  
  return new Promise(function(resolve, reject) {
    // The Promise constructor should catch any errors thrown on
    // this tick. Alternately, try/catch and reject(err) on catch.
      let connection = mysql.createConnection({
      host     :  process.env.DB_HOST || config.get('mysql.host'), 
      database :  process.env.DB_DATABASE || config.get('mysql.database'),
      user     :  process.env.DB_USERNAME || config.get('mysql.user'),
      password :  process.env.DB_PASSWORD || config.get('mysql.password'),
    });
   

    connection.query(query, params, function (err, rows, fields) {
        // Call reject on error states,
        // call resolve with results
        if (err) {
            return reject(err);
        }
        resolve(rows[0]);
    });

    connection.end();

});
}

function convertBoolean(value) {
  return value == 0 ? false : true;
}

module.exports = { convertBoolean , exec_Procedure};
