const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');

// signup
exports.signup = (req, res, next) => {
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
    user.save().then(re)
  });

  var result = user_md.addUser(users);
};

// signin
exports.signin = (req, res, next) => {

};

