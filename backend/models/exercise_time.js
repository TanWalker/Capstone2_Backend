var db = require("../common/database");
var sequelize = require("sequelize");

var exercise_time = db.connect.define(
  "exercise_time",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    start: { type: sequelize.FLOAT, allowNull: false },
    end: { type: sequelize.FLOAT, allowNull: true },
    exercise_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: exercise_time
  }
);

module.exports = exercise_time;
