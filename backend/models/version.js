var db = require("../common/database");
var sequelize = require("sequelize");

var version = db.connect.define(
  "version",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    front_version: { type: sequelize.TEXT, allowNull: false },
    back_version: { type: sequelize.TEXT, allowNull: false },
    description: { type: sequelize.TEXT, allowNull: false },
    name: { type: sequelize.TEXT, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: version
  }
);

module.exports = version;