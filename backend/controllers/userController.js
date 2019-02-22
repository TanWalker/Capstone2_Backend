const bodyParser = require('body-parser');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// signup
exports.Register = (req, res, next) => {
  var params = req.body;
  var data = user_md.getUserByUsername(params.username);
  if (
    params.username.trim().length == 0 ||
    params.email.trim().length == 0 ||
    params.password.trim().length == 0 ||
    params.lastname.trim().length == 0
  ) {
    return res
      .status(401)
      .json(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.MISSING_INFORMATION
        )
      );
  } else if (data) {
    return res
      .status(401)
      .json(
        new ReturnResult('Error', null, null, Constants.messages.EXISTING_USER)
      );
  } else {
    bcrypt.hash(params.password, 10).then(function(password) {
      const users = {
        username: params.username,
        email: params.email,
        password: password,
        first_name: params.firstname,
        last_name: params.lastname,
        dob: params.dateofbirth,
        phone_num: params.phone_num
      };
      var result = user_md.addUser(users);
      result
        .then(function(user) {
          var result = {
            user: user
          };
          res
            .status(200)
            .json(new ReturnResult(null, user, 'User Created', null));
        })
        .catch(function(err) {
          res
            .status(500)
            .json(
              new ReturnResult(
                'Error',
                null,
                null,
                Constants.messages.USER_NOT_FOUND
              )
            );
        });
    });
  }
};

// Signin
exports.Login = (req, res, next) => {
  var params = req.body;
  // Check if username is blank
  if (params.username.trim().length == 0) {
    return res
      .status(400)
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
            .status(400)
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
          { username: fetchedUser.username },
          'dgj1qgh21j125125k1hj25j125ghj21g4j1h2g51j5g6b09u8',
          { expiresIn: '1h' }
        );
        var expiresIn = 3600;
        var data = {
          token: token,
          expiresIn: expiresIn,
          user: fetchedUser
        };
        return res
          .status(200)
          .json(new ReturnResult(null, data, Constants.verification.ACCEPTED));
      })
      .catch(function(err) {
        return res
          .status(400)
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
