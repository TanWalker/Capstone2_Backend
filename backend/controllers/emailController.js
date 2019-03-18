const ReturnResult = require('../libs/ReturnResult');
const Constants = require('../libs/Constants');
const nodeMailer = require('nodemailer');

const sender = 'feedback.swim.tracker@gmail.com'; // The email to be use in sending the email, it's default.
const password = 'enclaveit'; // password of the email to use, it's default.

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
var sendMail = function(toAddress, subject, content, next) {
  var mailOptions = {
    from: "Feedback Center of Quan Khu 5",
    to: toAddress,
    subject: subject,
    html: content
  };
  // send action by transporter
  smtpTransport.sendMail(mailOptions, function(err, info) {
    if (err) {
      // console.log(err); if send fail, return message
      res.jsonp(
        new ReturnResult(null, null, null, Constants.messages.SEND_EMAIL_FAIL)
      );
    } else {
      // console.log(info); if email was sent, return message
      res.jsonp(
        new ReturnResult(
          null,
          null,
          null,
          Constants.messages.SEND_EMAIL_SUCCESSFUL
        )
      );
    }
  });
};

// this function is send feedback
exports.sendFeedBack = function(req, res, next) {
  console.log('Sending Feedback');
  var to_email = 'phamanhkhoa0@gmail.com';
  var params = req.body;
  sendMail(
    to_email,
    params.title ,
    params.content //html content
  );
};
