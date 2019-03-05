var db = require('../common/database');
var sequelize = require('sequelize');

var schedule = db.connect.define(
  'schedule',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    START: { type: sequelize.TIME, allowNull: false },
    END: { type: sequelize.TIME, allowNull: false },
    exercise_id: { type: sequelize.INTEGER, allowNull: false },
    coach_id: { type: sequelize.INTEGER, allowNull: false },
    day: { type: sequelize.INTEGER, allowNull: false },
    month: { type: sequelize.INTEGER, allowNull: false },
    year: { type: sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: schedule
  }
);

module.exports = schedule;
