var db = require('../common/database');
var sequelize = require('sequelize');

var style = db.connect.define(
  'style',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    swim_name: { type: sequelize.TEXT, allowNull: false },
    description: { type: sequelize.TEXT, allowNull: false },
    coach_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: style
  }
);

module.exports = style;
