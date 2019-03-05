var db = require('../common/database');
var sequelize = require('sequelize');

var exercise = db.connect.define(
  'exercise',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: { type: sequelize.TEXT, allowNull: false },
<<<<<<< HEAD
    style: { type: sequelize.TEXT, allowNull: false },
    distance: { type: sequelize.TEXT, allowNull: false },
    reps: { type: sequelize.INTEGER, allowNull: false },
    coach_id: { type: sequelize.INTEGER, allowNull: false }
=======
    style: { type: sequelize.INTEGER, allowNull: false },
    distance: { type: sequelize.INTEGER, allowNull: false },
    reps: { type: sequelize.INTEGER, allowNull: false }
>>>>>>> 89d67cdcceea24c5808f673b3671f9f402884e8f
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: exercise
  }
);

module.exports = exercise;
