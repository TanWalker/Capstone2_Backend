const emailController = require('../controllers/emailController');
const user_md = require('../models/user');
const schedule = require('node-schedule');
const common = require('../common/common');
var rule = new schedule.RecurrenceRule();
rule.second = 1;

exports.monthlyReporter = function() {
  console.log('Monthly report');
  // get report
  // var cronExpress = '*/5 * * * * * *';
  schedule.scheduleJob(rule, function(fireDate) {
    console.log('running job!');
    console.log(fireDate);
    user_md
      .findAll({
        attributes: ['email', 'id', 'first_name', 'last_name'],
        where: {
          is_coach: 0
        }
      })
      .then(function(data) {
        Object.keys(data).forEach(function(key) {
          data[key] = JSON.stringify(data[key]);
          var obj = JSON.parse(data[key]);
          var query = 'CALL `auto_tool_report_proc`( ? , ? , ? );';
          var dateObj = new Date();
          var month = dateObj.getUTCMonth() + 1; //months from 1-12
          var year = dateObj.getUTCFullYear();
          const name = obj.last_name + ' ' + obj.first_name;

          common
            .exec_Procedure(query, [month, year, obj.id])
            .then(function(results) {
              if (results.length != 0) {
                emailController.monthlyMail(obj.email, results, name, month);
                console.log(name);
                console.log(results);
              }
            })
            .catch(err =>
              setImmediate(() => {
                throw err;
              })
            );

          // i++;
          // if(i==6) break;
        });
      });
  });
};