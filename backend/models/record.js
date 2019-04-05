var db = require('../common/database');
var sequelize = require('sequelize');

var record = db.connect.define(
  'record',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: { type: sequelize.INTEGER, allowNull: false },
    createdAt: { type: sequelize.DATE, allowNull: false },
    schedule_id: { type: sequelize.INTEGER, allowNull: false },
    min_time: { type: sequelize.INTEGER, allowNull: true },
    max_time: { type: sequelize.INTEGER, allowNull: true },
    min_hr: { type: sequelize.INTEGER, allowNull: true },
    max_hr: { type: sequelize.INTEGER, allowNull: true },
    heart_rate: { type: sequelize.INTEGER, allowNull: false },
    time_swim: { type: sequelize.FLOAT, allowNull: true },
    attitude: { type: sequelize.TEXT, allowNull: true },
    result: { type: sequelize.TEXT, allowNull: true },
    note: { type: sequelize.TEXT, allowNull: true },
    best_result: { type: sequelize.TEXT, allowNull: true },
    errors: { type: sequelize.TEXT, allowNull: true },
    coach_id: { type: sequelize.INTEGER, allowNull: false },
    exercise_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: record
  }
);

module.exports = record;
