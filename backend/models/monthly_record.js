var db = require('../common/database');
var sequelize = require('sequelize');

var monthly_record = db.connect.define(
  'monthly_record',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: { type: sequelize.INTEGER, allowNull: false },
    avg_min_time: { type: sequelize.INTEGER, allowNull: false },
    avg_max_time: { type: sequelize.INTEGER, allowNull: false },
    avg_min_hr: { type: sequelize.INTEGER, allowNull: false },
    avg_max_hr: { type: sequelize.INTEGER, allowNull: false },
    avg_hr: { type: sequelize.INTEGER, allowNull: false },
    avg_time: { type: sequelize.FLOAT, allowNull: false },
    feed_back: { type: sequelize.TEXT, allowNull: true },
    type: { type: sequelize.TEXT, allowNull: false },
    month: { type: sequelize.INTEGER, allowNull: true },
    year: { type: sequelize.INTEGER, allowNull: true },
    coach_id: { type: sequelize.INTEGER, allowNull: false },
    exercise_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: monthly_record
  }
);

module.exports = monthly_record;
