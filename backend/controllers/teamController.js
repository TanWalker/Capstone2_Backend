const bodyParser = require('body-parser');
const user_md = require('../models/team');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');
const config = require('config');

exports.Register = (req, res, next) => {
    var params = req.body;
    var data = user_md.findOne({ where: { name: params.name } });
    //check whether existing user
    data.then(function(data) {
      if (data) {
        return res.json(
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
              var result = {
                user: user
              };
              res
                .status(200)
                .json(new ReturnResult(null, result, 'User Created', null));
            })
            .catch(function(err) {
              res.json(
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