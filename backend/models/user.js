var db = require('../common/database');
var sequelize = require('sequelize');

var user = db.connect.define('user', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  role_id: { type: sequelize.INTEGER, allowNull: false },
  username: { type: sequelize.TEXT, allowNull: false },
  password: { type: sequelize.TEXT, allowNull: false },
  first_name:{type:sequelize.TEXT},
  last_name:{type:sequelize.TEXT},
  dob:{type:sequelize.DATE},
  phone:{type:sequelize.CHAR},
  email:{type:sequelize.TEXT},
  address:{type:sequelize.TEXT},
  parent_name:{type:sequelize.TEXT},
  parent_phone:{type:sequelize.CHAR},
  gender:{type:sequelize.TINYINT},
  is_verified:{type:sequelize.TINYINT},
  age:{type:sequelize.INTEGER},
  height:{type:sequelize.FLOAT},
  weight:{type:sequelize.FLOAT},
  avatar:{type:sequelize.TEXT},
  slug:{type:sequelize.TEXT},
},{
  timestamps:false,
  freezeTableName:true,
  tableName:user
});

module.exports = user;
