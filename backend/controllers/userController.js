const bodyParser = require('body-parser');
const user_md = require('../models/user');
const record_md = require('../models/record');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const common = require('../common/common');

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
        // convert gender and is_verified to true or false
        fetchedUser.gender = common.convertBoolean(fetchedUser.gender);
        fetchedUser.is_verified = common.convertBoolean(
          fetchedUser.is_verified
        );
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

// update user controller
exports.updateUser = (req, res, next) => {
  console.log('Updating User');
  var params = req.body;
  user_md.findOne({ where: { id: req.userData.id } }).then(function(user) {
    if (user == null) {
      res.jsonp(
        new ReturnResult('Error', null, null, Constants.messages.USER_NOT_FOUND)
      );
    } else {
      user
        .update({
          avatar: params.avatar,
          first_name: params.first_name,
          last_name: params.last_name,
          email: params.email,
          phone: params.phone,
          dob: params.dob,
          gender: params.gender,
          height: params.height,
          weight: params.weight,
          is_verified: 1
        })
        .then(function() {
          return res.jsonp(
            new ReturnResult(null, null, 'User update successfully.', null)
          );
        })
        .catch(function() {
          return res.jsonp(
            new ReturnResult(
              'Error',
              null,
              null,
              Constants.messages.INVALID_INFORMATION
            )
          );
        });
    }
  });
};

//get current user is logging in by ID
exports.getCurrentUser = function(req, res, next) {
  console.log('Getting user by ID');
  if (req.userData) {
    return res.jsonp(
      new ReturnResult(req.userData, null, 'Get user successful.', null)
    );
    // user_md
    //   .findOne({ where: { id: req.userData.id } })
    //   .then(function(user) {
    //     user.is_verified = common.convertBoolean(user.is_verified);
    //     user.gender = common.convertBoolean(user.gender);
    //     console.log(user);
    //     res.jsonp(new ReturnResult(user, null, 'Get user successful.', null));
    //   })
    //   .catch(function(err) {
    //     return res.jsonp(
    //       new ReturnResult(
    //         'Error',
    //         null,
    //         null,
    //         Constants.messages.CAN_NOT_GET_USER
    //       )
    //     );
    //   });
  } else {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
};

exports.getUserIndex = function(req, res, next){

  record_md.findOne({where:{id : req.userData.id}}).then(function(user){
  if (!req.userData) {
    res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
  }else{
      user.update({
        bmi: req.userData.height == null && req.userData.weight == null ? req.userData.bmi : (req.userData.weight/Math.pow(req.userData.weight, 2)),
        speed: user.time_swim
      })
      console.log(typeof req.userData.height)
      .then(success => {
        res
          .status(200)
          .jsonp(
            new ReturnResult(success, null, 'Successful', null)
          );
        return;
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
    }
  });
}


exports.getUserBMITips = function(req, res, next){

  console.log('Getting user MBI tips');
  if (req.userData) {
  
    console.log(req.userData);
    common.getTips(10);
  } else {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
}