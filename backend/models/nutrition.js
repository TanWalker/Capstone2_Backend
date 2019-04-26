var db = require("../common/database");
var sequelize = require("sequelize");

var nutrition = db.connect.define(
  "nutrition",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    link: { type: sequelize.TEXT, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: nutrition
  }
);

module.exports = nutrition;