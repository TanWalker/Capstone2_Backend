const bodyParser = require('body-parser');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
exports.Register = (req, res, next) => {
  var params = req.body;
  var data = user_md.find({ where: { username: params.username } });
//check whether existing user
  data.then(function(data) {
    if (data) {
      return res
        .json(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXISTING_USER
          )
        );
    }else {
    //hash password
      bcrypt.hash(params.password, 10).then(function(password) {
    //Insert user to database
        var result = user_md.create({username: params.username,
          email: params.email,
          password: password,
          first_name: params.firstname,
          last_name: params.lastname,
          dob: params.dateofbirth,
          phone_num: params.phone_num,
          role_id: params.role_id});
        result
          .then(function(user) {
            var result = {
              user: user
            };
            res
              .status(200)
              .json(new ReturnResult(null, result, 'User Created', null));
          })
          .catch(function(err) {
            res
              .json(
                new ReturnResult(
                  'Error',
                  null,
                  null,
                  Constants.messages.INVALID_INFORMATION
                )
              );
          });
      });
    }
  });
};

// Signin
exports.Login = (req, res, next) => {
  var params = req.body;
  // Check if username is blank
  if (params.username.trim().length == 0) {
    return res
      .json(
        new ReturnResult('Error', null, null, Constants.messages.INVALID_USER)
      );
  } else {
    // Compare password
    var fetchedUser;
    var data = user_md.find({ where: { username: params.username } });
    data
      .then(function(user) {
        var user = user;
        fetchedUser = user;
        return bcrypt.compare(params.password, user.password);
      })
      .then(function(result) {
        // If wrong password
        if (!result) {
          return res
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
          .json(new ReturnResult(data, null, Constants.verification.ACCEPTED));
      })
      .catch(function(err) {
        return res
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
};
