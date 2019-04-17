var db = require("../common/database");
var sequelize = require("sequelize");

var youtube = db.connect.define(
  "youtube",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    link: { type: sequelize.TEXT, allowNull: false },
    style_id: { type: sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: youtube
  }
);

module.exports = youtube;