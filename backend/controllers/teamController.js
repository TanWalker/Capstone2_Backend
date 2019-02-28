const ReturnResult = require("../libs/ReturnResult");
const jwt = require("jsonwebtoken");
const config = require("config");
const team_md = require("../models/team");
const Constants = require("../libs/Constants");
const bcrypt = require("bcrypt");
const list = require("../libs/ListUser");
exports.Add_Team = (req, res, next) => {
  var params = req.body;
  var data = team_md.find({ where: { name: params.name } });
  //check whether existing team name
  data.then(function(data) {
    if (data) {
      return res.json(
        new ReturnResult(
          "Error",
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
          var users = new list(params.number, 0);
          users.then(function(ok) {
            // console.log(ok);
            var result = {
              team: team,
              user: ok
            };
            res
              .status(200)
              .json(new ReturnResult(null, result, "Team Created", null));
          });
        })
        .catch(function(err) {
          res.json(
            new ReturnResult(
              "Error",
              null,
              null,
              Constants.messages.INVALID_INFORMATION
            )
          );
        });
    }
  });
};
