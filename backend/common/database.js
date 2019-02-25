var config = require('config');
var mysql = require('mysql');
var Sequelize = require('sequelize');
require('dotenv').config();

var connect = new Sequelize(
  process.env.DB_DATABASE || config.get('mysql.database'),
  process.env.DB_USERNAME || config.get('mysql.user'),
  process.env.DB_PASSWORD || config.get('mysql.password'),
  {
    host: process.env.DB_HOST || config.get('mysql.host'),
    dialect: 'mysql',
    freezeTableName: true,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
console.log(process.env.DB_DATABASE);
connect
  .authenticate()
  .then(() => console.log('connected'))
  .catch(() => console.log('error'));

module.exports = {
  connect: connect
};
