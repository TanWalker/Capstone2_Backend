var db = require('../common/database');
var sequelize = require('sequelize');

var lesson_exercise = db.connect.define(
  'lesson_exercise',
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    lesson_id: { type: sequelize.INTEGER, allowNull: false },
    exercise_id: { type: sequelize.INTEGER, allowNull: false },
    type_of_exercise_id: { type: sequelize.INTEGER, allowNull: false },
    is_important: { type: sequelize.TINYINT },
    created_at: { type: sequelize.DATE },
    updated_at: { type: sequelize.DATE }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: lesson_exercise
  }
);

module.exports = lesson_exercise;
