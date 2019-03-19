const ReturnResult = require('../libs/ReturnResult');
const Constants = require('../libs/Constants');
const nodeMailer = require('nodemailer');
const sender = process.env.FEEDBACK_EMAIL; // The email to be use in sending the email, it's default.
const password = process.env.FEEDBACK_EMAIL_PASSWORD; // password of the email to use, it's default.

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
var sendMail = function(toAddress, subject, content, res) {
  var mailOptions = {
    from: 'Feedback Center of Quan Khu 5',
    to: toAddress,
    subject: subject,
    html: content
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
//css of template
var css_new_team = 'table.blueTable { border: 2px solid #0071B4; background-color: #FFFFFF; width: 200px; text-align: center; border-collapse: collapse;}table.blueTable td, table.blueTable th { border: 1px solid #AAAAAA; padding: 3px 2px;}table.blueTable tbody td { font-size: 13px;}table.blueTable tr:nth-child(even) { background: #B9B9B9;}table.blueTable thead { background: #0071B4;}table.blueTable thead th { font-size: 19px; font-weight: bold; color: #FFFFFF; text-align: center; border-left: 2px solid #0071B4;}table.blueTable thead th:first-child { border-left: none;}table.blueTable tfoot { font-size: 13px; font-weight: bold; color: #FFFFFF; background: #0071B4;}table.blueTable tfoot td { font-size: 13px;}table.blueTable tfoot .links { text-align: right;}table.blueTable tfoot .links a{ display: inline-block; background: #FFFFFF; color: #0071B4; padding: 2px 8px; border-radius: 5px;}';
// send new team to admin email
exports.sendNewTeam = function(users, team_name, coach_email) {
  //define html
  var result = '<!DOCTYPE html><html><head><style>'+css_new_team+'</style></head><body><h2>List user of new team '+team_name+' : </h2><table class="blueTable"> <thead> <tr> <th>Username</th> <th>password</th> </tr> </thead>';
  Object.keys(users).forEach(function(key) {
    var obj = JSON.parse(users[key]);
    result = result + '<tr> <th>' + obj.username + '</th> <th>123456</th> </tr>';
  });
   result = result + '</table></body></html>';
  var mailOptions = {
    from: 'Feedback Center of Quan Khu 5',
    to: coach_email,
    subject: 'List trainee of new team: ' + team_name,
    html: result
  };
  // send action by transporter
  smtpTransport.sendMail(mailOptions);
};

// this function is send feedback
exports.sendFeedBack = function(req, res, next) {
  console.log('Sending Feedback');
  var to_email =
    process.env.FEEDBACK_ADMIN_EMAIL || Constants.FEEDBACK_ADMIN_EMAIL;
  var params = req.body;
  sendMail(
    to_email,
    params.title,
    params.content, //html content
    res
  );
};
