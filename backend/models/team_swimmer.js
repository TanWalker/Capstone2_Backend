var db = require('../common/database');
var sequelize = require('sequelize');

var team_swimmer = db.connect.define(
  'team-swimmer',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    team_id: { type: sequelize.INTEGER, allowNull: false },
    user_id: { type: sequelize.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: team_swimmer
  }
);

module.exports = team_swimmer;
