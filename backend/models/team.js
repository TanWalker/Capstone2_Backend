var db = require('../common/database');
var sequelize = require('sequelize');

var team = db.connect.define('team', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  coach_id: { type: sequelize.INTEGER, allowNull: false },
  name: { type: sequelize.TEXT, allowNull: false },
  age: { type: sequelize.INTEGER, allowNull: false },
},{
  timestamps:false,
  freezeTableName:true,
  tableName:team
});

module.exports = team;
