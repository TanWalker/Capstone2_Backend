const emailController = require('../controllers/emailController');
const record_md = require('../models/record');
const user_md = require('../models/user');
const schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.second = 1;

module.exports = {
  monthlyReporter: function() {
    console.log('Monthly report');
    // get report
    // var cronExpress = '*/5 * * * * * *';
    schedule.scheduleJob(rule, function(fireDate) {
      console.log('running job!');
      console.log(fireDate);
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
              record_md.findAll({
                  where: {
                    user_id: obj.id
                  }
                });
            });
          emailController.monthlyMail(data);
        });
    });
  }
};
