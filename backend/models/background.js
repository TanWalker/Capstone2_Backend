var db = require("../common/database");
var sequelize = require("sequelize");

var background = db.connect.define(
  "background",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    url: { type: sequelize.TEXT, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: background
  }
);

module.exports = background;
