const ReturnResult = require('../libs/ReturnResult');
const Constants = require('../libs/Constants');
const nodeMailer = require('nodemailer');
const path = require('path');
const sender = process.env.FEEDBACK_EMAIL; // The email to be use in sending the email, it's default.
const password = process.env.FEEDBACK_EMAIL_PASSWORD; // password of the email to use, it's default.
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const XlsxPopulate = require('xlsx-populate');
//Before sending your email using gmail you have to allow non secure apps to access gmail you can do
//this by going to your gmail settings here.
//https://myaccount.google.com/lesssecureapps

// create send transporter
var smtpTransport = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: sender,
    pass: password
  }
});
//function for send email
var sendEmail = function(toAddress, subject, content, res, attachment) {
  var mailOptions = {
    from: 'Feedback Center of Quan Khu 5',
    to: toAddress,
    subject: subject,
    html: content,
    attachments: attachment
  };
  // send action by transporter
  smtpTransport
    .sendMail(mailOptions)
    .then(function(success) {
      res.jsonp(
        new ReturnResult(
          null,
          null,
          Constants.messages.SEND_EMAIL_SUCCESSFUL,
          null
        )
      );
    })
    .catch(function(err) {
      res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.SEND_EMAIL_FAIL
        )
      );
    });
};

// send new team to admin email
exports.sendNewTeam = function(users, team, coach_email, number) {
  //define html
  fs.readFile(
    __dirname + '/../templates/new_team/newteam_email.html',
    'utf8',
    function(err, html) {
      //send html to dom
      const dom = new JSDOM(html);
      // get table and set information of new team
      var table = dom.window.document.getElementById('new_trainee');
      dom.window.document.getElementById('title').innerHTML =
        'Team name: ' + team.name;
      dom.window.document.getElementById('age_number').innerHTML =
        'Team age: ' + team.age;
      dom.window.document.getElementById('team_number').innerHTML =
        'Team number: ' + number;
      // set list new user.
      Object.keys(users).forEach(function(key) {
        var obj = JSON.parse(users[key]);
        // Create an empty <tr> element and add it to the 1st position of the table:
        var row = table.insertRow(-1);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        // Add some text to the new cells:
        cell1.innerHTML = obj.username;
        cell2.innerHTML = '123456';
      });

      var mailOptions = {
        from: 'Feedback Center of Quan Khu 5',
        to: coach_email,
        subject: 'List trainee of new team: ' + team.name,
        html: dom.window.document.documentElement.innerHTML
      };
      // send action by transporter
      smtpTransport.sendMail(mailOptions);
    }
  );
};

// this function is send feedback
exports.sendFeedBack = function(req, res, next) {
  console.log('Sending Feedback');
  var to_email =
    process.env.FEEDBACK_ADMIN_EMAIL || Constants.FEEDBACK_ADMIN_EMAIL;
  var params = req.body;
  sendEmail(
    to_email,
    params.title,
    params.content, //html content
    res
  );
};

// this function is send monthly report
exports.monthlyMail = function(email, data, name, month) {
  var path_dir = path.join(__dirname, '../templates/monthly_template/');
  // modify excel
  XlsxPopulate.fromFileAsync(path_dir + 'monthly_report.xlsx')
    .then(workbook => {
      let i = 3;
      workbook
        .sheet('Performance')
        .cell('A1')
        .value('THEO DÕI THÀNH TÍCH ' + name + ' THÁNG ' + month);
      // Modify the workbook.
      Object.keys(data).forEach(function(key) {
        data[key] = JSON.stringify(data[key]);
        var obj = JSON.parse(data[key]);
        workbook
          .sheet('Performance')
          .cell('A' + i)
          .value(obj.day + '/' + obj.month + '/' + obj.year);
        workbook
          .sheet('Performance')
          .cell('B' + i)
          .value(obj.name + 'x' + obj.distance);
        workbook
          .sheet('Performance')
          .cell('C' + i)
          .value(parseInt(obj.time_swim));
        workbook
          .sheet('Performance')
          .cell('C' + i)
          .style('numberFormat', '0');
        workbook
          .sheet('Performance')
          .cell('D' + i)
          .value(obj.coach_lname + ' ' + obj.coach_fname);
        workbook
          .sheet('Performance')
          .cell('E' + i)
          .value(obj.errors);
        workbook
          .sheet('Performance')
          .cell('F' + i)
          .value(obj.best_result);
        workbook
          .sheet('Performance')
          .cell('G' + i)
          .value(obj.note);
        workbook
          .sheet('Performance')
          .cell('H' + i)
          .value(obj.result);
        i++;
        console.log(i);
      });
      return workbook.toFileAsync(
        path_dir + 'MonthlyReport_' + name + '_Thang' + month + '.xlsx'
      );
    })
    .then(() => {
      var mailOptions = {
        from: 'Feedback Center of Quan Khu 5',
        to: email,
        subject: 'THEO DÕI THÀNH TÍCH ' + name + ' THÁNG ' + month,
        html: 'Tải bản tính dưới để theo dõi thành tích.',
        attachments: [
          {
            path:
              path_dir + 'MonthlyReport_' + name + '_Thang' + month + '.xlsx'
          }
        ]
      };
      // send action by transporter
      smtpTransport
        .sendMail(mailOptions)
        .then(success => {
          fs.unlinkSync(
            path_dir + 'MonthlyReport_' + name + '_Thang' + month + '.xlsx'
          );
        })
        .catch(function(err) {
          console.log(err.message);
        });
    })
    .catch(err => console.error(err));
};

// this function is send report to parent
exports.reportMail = function(email, data, name, month , year, note) {
  var path_dir = path.join(__dirname, '../templates/monthly_template/');
  // modify excel
  XlsxPopulate.fromFileAsync(path_dir + 'out.xlsx')
    .then(workbook => {
      let i = 3;
      workbook
        .sheet('Performance')
        .cell('A1')
        .value('THEO DÕI THÀNH TÍCH ' + name + ' ' + month + '-' + year);
      workbook
        .sheet('Performance')
        .cell('H' + 1)
        .value(note);
      // Modify the workbook.
      Object.keys(data).forEach(function(key) {
        data[key] = JSON.stringify(data[key]);
        var obj = JSON.parse(data[key]);
        workbook
          .sheet('Performance')
          .cell('A' + i)
          .value(obj.day + '/' + obj.month + '/' + obj.year);
        workbook
          .sheet('Performance')
          .cell('B' + i)
          .value(obj.name + 'x' + obj.distance);
        workbook
          .sheet('Performance')
          .cell('C' + i)
          .value(parseInt(obj.time_swim));
        workbook
          .sheet('Performance')
          .cell('C' + i)
          .style('numberFormat', '0');
        workbook
          .sheet('Performance')
          .cell('D' + i)
          .value(obj.display_name);
        workbook
          .sheet('Performance')
          .cell('E' + i)
          .value(obj.errors);
        workbook
          .sheet('Performance')
          .cell('F' + i)
          .value(obj.best_result);
        workbook
          .sheet('Performance')
          .cell('G' + i)
          .value(obj.note);
        workbook
          .sheet('Performance')
          .cell('H' + i)
          .value(obj.result);
        i++;
        console.log(i);
      });
      return workbook.toFileAsync(
        path_dir + 'Report_'  + name + '_' + month + '-' + year + '.xlsx'
      );
    })
    .then(() => {
      var mailOptions = {
        from: 'Feedback Center of Quan Khu 5',
        to: email,
        subject: 'THEO DÕI THÀNH TÍCH '  + name + ' ' + month + '-' + year,
        html: 'Tải bản tính dưới để theo dõi thành tích.',
        attachments: [
          {
            path:
              path_dir + 'Report_'  + name + '_' + month + '-' + year + '.xlsx'
          }
        ]
      };
      // send action by transporter
      smtpTransport
        .sendMail(mailOptions)
        .then(success => {
          fs.unlinkSync(
            path_dir + 'Report_'  + name + '_' + month + '-' + year + '.xlsx'
          );
        })
        .catch(function(err) {
          console.log(err.message);
        });
    })
    .catch(err => console.error(err));
};
