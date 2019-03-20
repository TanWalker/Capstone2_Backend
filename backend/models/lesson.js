var db = require('../common/database');
var sequelize = require('sequelize');

var lesson = db.connect.define(
  'lesson',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: { type: sequelize.TEXT, allowNull: false },
    coach_id: { type: sequelize.TEXT, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: lesson
  }
);

module.exports = lesson;
