var db = require("../common/database");
var sequelize = require("sequelize");

var lesson_plan = db.connect.define(
  "lesson_plan",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: { type: sequelize.TEXT, allowNull: false },
    exercise_time_ids: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: lesson_plan
  }
);

module.exports = lesson_plan;
