var db = require('../common/database');
var sequelize = require('sequelize');

var team = db.connect.define(
  'team',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    heart_rate: { type: sequelize.INTEGER, allowNull: false },
    user_id: { type: sequelize.INTEGER, allowNull: false },
    time_swim: { type: sequelize.FLOAT, allowNull: false },
    date_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: record
  }
);

module.exports = record;
