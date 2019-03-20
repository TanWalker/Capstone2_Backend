var db = require('../common/database');
var sequelize = require('sequelize');

var type_of_exercise = db.connect.define('type_of_exercise', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: { type: sequelize.TEXT, allowNull: false },
  description: { type: sequelize.TEXT, allowNull: false },
  logo: { type: sequelize.TEXT, allowNull: false}
},{
  timestamps:false,
  freezeTableName:true,
  tableName:type_of_exercise
});

module.exports = type_of_exercise;
