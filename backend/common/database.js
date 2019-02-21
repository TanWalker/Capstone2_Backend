var config = require('config');
var mysql = require('mysql');
var Sequelize = require('sequelize');


var connect = new Sequelize(
  config.get('mysql.database'),
  config.get('mysql.user'),
  config.get('mysql.password'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql',
    freezeTableName: true,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      
    },
  },
);

connect.authenticate().then(()=>console.log('connected')).catch(()=>console.log('error'));


module.exports = {
  connect: connect
};
