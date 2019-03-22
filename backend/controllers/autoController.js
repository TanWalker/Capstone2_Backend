const ReturnResult = require('../libs/ReturnResult');
const emailController = require('../models/emailController');
const Constants = require('../libs/Constants');
const record_md = require('../models/record');
const user_md = require('../models/user');

exports.monthlyReport = function() {
  console.log('Monthly report');
  // get report
  user_md
    .findAll({
      attributes: ['email', 'id'],
      where: {
        is_coach: 0
      }
    })
    .then(function(data) {
      
      Object.keys(list).forEach(function(key) {
        var obj = JSON.parse(list[key]);
        result.push(obj);
        bcrypt.hash('123456', 10).then(function(password) {
          user_md.create({
            username: obj.username,
            password: password,
            role_id: 3,
            team_id: team.id,
            is_verified: 0
          });
        });
      });
      record_md.findAll({
        where: {
          user_id: data.id
        }
      });
    });
};
