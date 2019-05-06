var db = require("../common/database");
var sequelize = require("sequelize");

var date = db.connect.define(
  "date",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    year: { type: sequelize.INTEGER, allowNull: false },
    quarter: { type: sequelize.INTEGER, allowNull: false },
    month: { type: sequelize.INTEGER, allowNull: false },
    date: { type: sequelize.INTEGER, allowNull: false },
    schedule_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: date
  }
);

module.exports = date;
