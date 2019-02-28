const ReturnResult = require('../libs/ReturnResult');
const jwt = require('jsonwebtoken');
const config = require('config');
const team_md = require('../models/team');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const bcrypt = require('bcrypt');
const list = require('../libs/ListUser');

exports.Add_Team = (req, res, next) => {
  var params = req.body;
  var data = team_md.find({ where: { name: params.name } });
  //check whether existing team name
  data.then(function(data) {
    if (data) {
      return res.json(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.EXISTING_TEAM_NAME
        )
      );
    } else {
      //Insert team info to database // req.userData.id
      var result = team_md.create({
        coach_id: params.coach_id,
        name: params.name,
        age: params.age
      });
      result
        .then(function(team) {
          // console.log(team);
          //Insert user to database
          var result = [];
          var find_last = new Promise(function(resolve, reject) {
            user_md
              .findOne({
                limit: 1,
                where: {},
                order: [['id', 'DESC']]
              })
              .then(function(record) {
                console.log('a');
                return resolve(record.id);
              });
          });

          find_last
            .then(function(user_id) {
              var list = {};
              var k = user_id;
              console.log(k);
              for (var i = 0; i < params.number; i++) {
                k++;
                var user = {
                  username: 'akg_' + k + '',
                  password:
                    '$2b$10$cwB2qTEL1EEm7wQav9f5nePM7RXdJQ6aKXVyqEAcbBJUwP.LDH4Jq'
                };
                user = JSON.stringify(user);
                list[i] = {};
                list[i] = user;
              }

              Object.keys(list).forEach(function(key) {
                // console.log('Key : ' + key + ', Value : ' + list[key]);

                var obj = JSON.parse(list[key]);
                result.push(obj);
                user_md
                  .create({
                    username: obj.username,
                    password: obj.password,
                    role_id: 3
                  })
                  .catch(function(err) {
                    result.push({
                      user: user
                    });
                  });
              });
              console.log(result);
              return Promise.resolve(result);
            })
            .then(function(info) {
              console.log(info);
              var result = {
                team: team,
                list_user: info
              };
              res
                .status(200)
                .json(new ReturnResult(null, result, 'Team Created', null));
            });
        })
        .catch(function(err) {
          res.json(
            new ReturnResult(
              err.message,
              null,
              null,
              Constants.messages.INVALID_INFORMATION
            )
          );
        });
    }
  });
};
