var db = require("../common/database");
var sequelize = require("sequelize");

var exercise = db.connect.define(
  "exercise",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: { type: sequelize.TEXT, allowNull: false },
    style: { type: sequelize.INTEGER, allowNull: false },
    distance: { type: sequelize.INTEGER, allowNull: false },
    reps: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: exercise
  }
);

module.exports = exercise;
