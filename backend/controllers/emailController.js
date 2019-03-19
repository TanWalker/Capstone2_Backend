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
  smtpTransport.sendMail(mailOptions).then(function(success) {
    res.jsonp(
      new ReturnResult(
        null,
        null,
        null,
        Constants.messages.SEND_EMAIL_SUCCESSFUL
      )
    );
  });
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
