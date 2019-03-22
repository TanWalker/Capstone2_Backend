const ReturnResult = require('../libs/ReturnResult');
const team_md = require('../models/team');
const user_md = require('../models/user');
const Constants = require('../libs/Constants');
const bcrypt = require('bcrypt');
const auth = require('../middleware/AuthGuard');
const common = require('../common/common');
const emailController = require('../controllers/emailController');

// this function is used to test ( get all team )
exports.getTeam = function(req, res, next) {
  console.log('Getting all team');
  // check for user
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
  }

  // find all team
  team_md.findAll().then(function(teams) {
    // get result
    var result = new ReturnResult(null, teams, 'All teams', null);

    // return
    res.jsonp(result);
  });
};

// this function is delete team
exports.deleteTeam = function(req, res, next) {
  console.log('Deleting team');

  // check for user
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
  }
  var team_id = req.params.team_id;
  // find all team
  team_md.findOne({ where: { id: team_id } }).then(function(teams) {
    // delete teams
    teams.destroy();
    // get result
    var result = new ReturnResult(null, null, 'Delete team successfully', null);
    // return
    res.jsonp(result);
  });
};

// this function add new team and generate new user
exports.addTeam = (req, res, next) => {
  // check authorization if ==3 or null return unauthorized
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    // else coach and admin can use this function below
  } else {
    var params = req.body;
    var data = team_md.findOne({ where: { name: params.name } });
    // check whether existing team name
    data.then(function(data) {
      if (data) {
        return res.jsonp(
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
                    password: '123456',
                    is_verified: '0'
                  };
                  // add user to a list
                  user = JSON.stringify(user);
                  list[i] = {};
                  list[i] = user;
                }
                emailController.sendNewTeam(list, team, req.userData.email, params.number);
                // loop the list and add to db
                Object.keys(list).forEach(function(key) {
                  var obj = JSON.parse(list[key]);
                  result.push(obj);
                  bcrypt.hash('123456', 10).then(function(password) {
                    user_md.create({
                      username: obj.username,
                      password: password,
                      role_id: 3,
                      team_id: team.id,
                      is_verified: 0
                    });
                  });
                });
                // return the list user
                return Promise.resolve(result);
              })
              .then(function(info) {
                var result = {
                  team: team,
                  list_user: info
                };
                // response the team and the list user
                res
                  .status(200)
                  .jsonp(new ReturnResult(null, result, 'Team Created', null));
              });
          })
          .catch(function(err) {
            res.jsonp(
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
  }
};

// this function is update team
exports.updateTeam = function(req, res, next) {
  console.log('Updating team');
  // check for user
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
  } else {
    const params = req.body;
    var id = params.id;
    team_md.findOne({ where: { id: id } }).then(function(team) {
      if (team == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.INVALID_TEAM_ID
          )
        );
      } else {
        team
          .update({
            name: params.name == null ? team.name : params.name,
            age: params.age == null ? team.age : params.age
          })
          .then(success => {
            res
              .status(200)
              .jsonp(new ReturnResult(null, null, 'Update successful', null));
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
};

// Get team by coach
exports.getTeamByCoach = function(req, res, next) {
  console.log('Get Team By Coach');
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  } else {
    // Select all team by coach id
    team_md
      .findAll({
        attributes: ['id', 'name', 'age'],
        where: { coach_id: req.userData.id }
      })
      .then(function(results) {
        return res.jsonp(
          new ReturnResult(null, results, 'Get team information.', null)
        );
      })
      .catch(function(err) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_TEAM
          )
        );
      });
  }
};

// Get member by team
exports.getMemberByTeam = function(req, res, next) {
  console.log('Get Member By Team');
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  } else {
    // Select all team by coach id
    user_md
      .findAll({
        attributes: [
          'id',
          'username',
          'display_name',
          'dob',
          'phone',
          'gender',
          'avatar',
          'height',
          'weight',
          'is_verified'
        ],
        where: { team_id: req.params.team_id }
      })
      .then(function(results) {
        Object.keys(results).forEach(function(key) {
          results[key].is_verified = common.convertBoolean(
            results[key].is_verified
          );
          results[key].gender = common.convertBoolean(results[key].gender);
        });
        return res.jsonp(
          new ReturnResult(null, results, 'Get member by team.', null)
        );
      })
      .catch(function(err) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_MEMBER
          )
        );
      });
  }
};

// Get member by id
exports.getMemberById = function(req, res, next) {
  console.log('Get Member By Id');
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  } else {
    // select a member with selected attribute
    user_md
      .findOne({
        attributes: [
          'id',
          'role_id',
          'username',
          'first_name',
          'last_name',
          'dob',
          'phone',
          'email',
          'address',
          'parent_name',
          'parent_phone',
          'gender',
          'age',
          'height',
          'weight',
          'team_id',
          'avatar',
          'is_verified'
        ],
        where: { id: req.body.user_id }
      })
      .then(function(user) {
        // return user
        user.is_verified = common.convertBoolean(user.is_verified);
        user.gender = common.convertBoolean(user.gender);
        return res.jsonp(
          new ReturnResult(user, null, 'Get member by Id.', null)
        );
      })
      .catch(function(err) {
        // return if unexpected error happen
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_MEMBER
          )
        );
      });
  }
};

// Remove a member out of team
exports.removeTeamMember = function(req, res, next) {
  console.log('Remove Member out of Team');
  //check if user is trainee, return and exit;
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }

  var params = req.body;
  // find user by the user_id and team_id
  var data = user_md.findOne({
    where: { id: params.user_id, team_id: params.team_id }
  });

  data.then(function(user) {
    if (user == null) {
      // return invalid user_id or user not in that team and exit
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_USER_IN_TEAM
        )
      );
    }
    // found one and remove out of team
    user
      .update({
        team_id: null
      })
      .then(function() {
        // delete data in team_swimmer too.
        var data = team_swimmer_md.findOne({
          where: { user_id: params.user_id, team_id: params.team_id }
        });
        // if it was found
        data.then(function(data) {
          if (data != null) {
            data.destroy();
          }
        });
        //return success
        return res.jsonp(
          new ReturnResult(
            null,
            null,
            'Remove member out of team successful.',
            null
          )
        );
      })
      .catch(function(err) {
        // catch error
        return res.jsonp(
          new ReturnResult(
            err.message,
            null,
            null,
            Constants.messages.INVALID_INFORMATION
          )
        );
      });
  });
};
