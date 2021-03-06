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
    start_hour: { type: sequelize.INTEGER, allowNull: false },
    end_hour: { type: sequelize.INTEGER, allowNull: false },
    exercise_id: { type: sequelize.INTEGER, allowNull: false },
    coach_id: { type: sequelize.INTEGER, allowNull: false },
    day: { type: sequelize.INTEGER, allowNull: false },
    month: { type: sequelize.INTEGER, allowNull: false },
    year: { type: sequelize.INTEGER, allowNull: false },
    start_minute: { type: sequelize.INTEGER, allowNull: false },
    end_minute: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: schedule
  }
);

module.exports = schedule;
