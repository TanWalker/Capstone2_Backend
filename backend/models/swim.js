var db = require('../common/database');
var sequelize = require('sequelize');

var swim_style = db.connect.define('style', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  swim_name: { type: sequelize.TEXT, allowNull: false },
  description: { type: sequelize.INTEGER, allowNull: false },
},{
  timestamps:false,
  freezeTableName:true,
  tableName:team
});

module.exports = swim_style;
