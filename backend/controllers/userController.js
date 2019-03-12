const bodyParser = require('body-parser');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// Register
exports.Register = (req, res, next) => {
  var params = req.body;
  var data = user_md.findOne({ where: { username: params.username } });
  //check whether existing user
  data.then(function(data) {
    if (data) {
      return res.jsonp(
        new ReturnResult('Error', null, null, Constants.messages.EXISTING_USER)
      );
    } else {
      //hash password
      bcrypt.hash(params.password, 10).then(function(password) {
        //Insert user to database
        var result = user_md.create({
          username: params.username,
          email: params.email,
          password: password,
          first_name: params.firstname,
          last_name: params.lastname,
          dob: params.dateofbirth,
          phone_num: params.phone_num,
          role_id: params.role_id
        });
        result
          .then(function(user) {
            res
              .status(200)
              .jsonp(new ReturnResult(user, null, 'User Created', null));
          })
          .catch(function(err) {
            res.jsonp(
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
  // console.log(params);
  // Check if username is blank
  if (params.username.trim().length == 0) {
    return res.jsonp(
      new ReturnResult('Error', null, null, Constants.messages.INVALID_USER)
    );
  } else {
    // Compare password
    var fetchedUser;
    var data = user_md.findOne({ where: { username: params.username } });
    data
      .then(function(user) {
        var user = user;
        fetchedUser = user;
        return bcrypt.compare(params.password, user.password);
      })
      .then(function(result) {
        // If wrong password
        if (!result) {
          return res.jsonp(
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
          {
            id: fetchedUser.id,
            username: fetchedUser.username,
            role_id: fetchedUser.role_id,
            first_name: fetchedUser.first_name,
            last_name: fetchedUser.last_name,
            dob: fetchedUser.dob,
            phone: fetchedUser.phone,
            email: fetchedUser.email,
            address: fetchedUser.address,
            parent_name: fetchedUser.parent_name,
            parent_phone: fetchedUser.parent_phone,
            gender: fetchedUser.gender,
            is_verified: fetchedUser.is_verified,
            age: fetchedUser.age,
            height: fetchedUser.height,
            weight: fetchedUser.weight,
            avatar: fetchedUser.avatar,
            slug: fetchedUser.slug,
            created_at: fetchedUser.created_at,
            updated_at: fetchedUser.updated_at
          },
          config.get('token_key'),
          { expiresIn: '1h' }
        );
        var expiresIn = 3600;
        var data = {
          token: token,
          expiresIn: expiresIn,
          user: {
            id: fetchedUser.id,
            username: fetchedUser.username,
            role_id: fetchedUser.role_id,
            first_name: fetchedUser.first_name,
            last_name: fetchedUser.last_name,
            dob: fetchedUser.dob,
            phone: fetchedUser.phone,
            email: fetchedUser.email,
            address: fetchedUser.address,
            parent_name: fetchedUser.parent_name,
            parent_phone: fetchedUser.parent_phone,
            gender: fetchedUser.gender,
            is_verified: fetchedUser.is_verified,
            age: fetchedUser.age,
            height: fetchedUser.height,
            weight: fetchedUser.weight,
            avatar: fetchedUser.avatar,
            slug: fetchedUser.slug,
            created_at: fetchedUser.created_at,
            updated_at: fetchedUser.updated_at
          }
        };
        return res
          .status(200)
          .jsonp(new ReturnResult(null, data, Constants.messages.AUTHORIZED));
      })
      .catch(function(err) {
        return res.jsonp(
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
