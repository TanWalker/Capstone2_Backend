const ReturnResult = require('../libs/ReturnResult');
const jwt = require('jsonwebtoken');
const team_md = require('../models/team');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const auth = require('../middleware/AuthGuard');


// this function is used to test ( get all team )
exports.Get_Team = function (req, res ,next) {

  console.log("Getting all team");
  // check for user
  if (!req.userData) {
      res.status(401).jsonp(new ReturnResult("Error", null, null, Constants.messages.UNAUTHORIZED_USER));
      return;
  }

      // find all team 
      team_md.findAll().then(function(teams) {

         // get result
         var result = new ReturnResult(null, teams, "All teams", null);
  
         // return
         res.jsonp(result);
      })

};

// this function is delete team , Eddy will create a trigger to delete all member of this team when we delete team
exports.Delete_Team = function (req, res ,next) {

  console.log("Deleting team");
  
  // check for user
  if (!req.userData) {
      res.status(401).jsonp(new ReturnResult("Error", null, null, Constants.messages.UNAUTHORIZED_USER));
      return;
  }
      var team_id = req.params.team_id;
      // find all team 
      team_md.findOne({ where : { id: team_id } }).then( function(teams) {

        // delete teams
        teams.destroy();
         // get result
         var result = new ReturnResult(null, null, "Delete team successfully", null);
  
         // return
         res.jsonp(result);
      })

};
exports.Add_Team = (req, res, next) => {
  var params = req.body;
  var data = team_md.findOne({ where: { name: params.name } });
  console.log(req.userData);
  // check whether existing team name
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
      // Insert team info to database // req.userData.id
      var result = team_md.create({
        coach_id: req.userData.id,
        name: params.name,
        age: params.age
      });
      result
        .then(function(team) {
          // Find the last id
          var result = [];
          var find_last = new Promise(function(resolve, reject) {
            user_md
              .findOne({
                limit: 1,
                where: {},
                order: [['id', 'DESC']]
              })
              .then(function(record) {
                return resolve(record.id);
              });
          });
          // After find the last id insert after username
          find_last
            .then(function(user_id) {
              var list = {};
              var last_id = user_id;
              for (var i = 0; i < params.number; i++) {
                last_id++;
                var user = {
                  username: 'QK5DN_' + last_id + '',
                  password:
                    '123456'
                };
                // add user to a list
                user = JSON.stringify(user);
                list[i] = {};
                list[i] = user;
              }
              // loop the list and add to db
              Object.keys(list).forEach(function(key) {
                var obj = JSON.parse(list[key]);
                result.push(obj);
                user_md
                  .create({
                    username: obj.username,
                    password: '$2b$12$cwB2qTEL1EEm7wQav9f5nePM7RXdJQ6aKXVyqEAcbBJUwP.LDH4Jq',
                    role_id: 3,
                    team_id: team.id
                  })
                  .catch(function(err) {
                    result.push({
                      user: user
                    });
                  });
              });
              // return the list user
              return Promise.resolve(result);
            })
            .then(function(info) {
              console.log(info);
              var result = {
                team: team,
                list_user: info
              };
              // response the team and the list user
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

// this function is update team
exports.Update_Team = function (req, res ,next) {

  console.log("Updating team");
  
  // check for user
  if (!req.userData) {
      res.status(401).jsonp(new ReturnResult("Error", null, null, Constants.messages.UNAUTHORIZED_USER));
      return;
  }
};