const bodyParser = require('body-parser');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signup
exports.Signup = (req, res, next) => {
  var user = req.body;
  bcrypt.hash(user.password, 10).then(function(hash) {
    const users = {
      username: user.username,
      email: user.email,
      password: hash,
      first_name: user.firstname,
      last_name: user.lastname,
      dob: user.dateofbirth,
      phone_num: user.phone_num
    };
    user.save().then(re);
  });

  var result = user_md.addUser(users);
};

// Signin
exports.Signin = (req, res, next) => {
  var params = req.body;
  // Check if username is blank
  if (params.username.trim().length == 0) {
    return res
      .status(401)
      .json(
        new ReturnResult('Error', null, null, Constants.messages.INVALID_USER)
      );
  } else {
    // Compare password
    var data = user_md.getUserByUsername(params.username);
    var fetchedUser;
    if (data) {
      data
        .then(function(user) {
          var user = user[0];
          fetchedUser = user;
          return bcrypt.compare(params.password, user.password);
        })
        .then(function(result) {
          // If wrong password
          if (!result) {
            return res
              .status(401)
              .json(
                new ReturnResult(
                  'Error',
                  null,
                  null,
                  Constants.messages.INVALID_PASSWORD
                )
              );
          }
          // json token to frontend
          const token = jwt.sign(
            { username: fetchedUser.username, role_id: fetchedUser.role_id },
            'secret_this_should_be_longer',
            { expiresIn: '1h' }
          );
          var expiresIn = 3600;
          var data = {
            token: token,
            expiresIn: expiresIn
          };
          return res
            .status(200)
            .json(
              new ReturnResult(data, null, Constants.verification.ACCEPTED)
            );
        })
        .catch(function(err) {
          return res
            .status(401)
            .json(
              new ReturnResult(
                'Error',
                null,
                null,
                Constants.messages.USER_NOT_FOUND
              )
            );
        });
    }
  }
};
