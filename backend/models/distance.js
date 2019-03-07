var db = require("../common/database");
var sequelize = require("sequelize");

var distance = db.connect.define(
  "distance",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    swim_distance: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: distance
  }
);

module.exports = distance;
