

var sequelize = require("sequelize");

function getTips(myBMI) {
  sequelize
  .query('CALL getBMI_tips(:BMI)', 
        {replacements: { BMI: myBMI }})
  .then(v=>console.log(v));
}

function convertBoolean(value) {
  return value == 0 ? false : true;
}

module.exports = { convertBoolean };
module.exports = { getTips };
