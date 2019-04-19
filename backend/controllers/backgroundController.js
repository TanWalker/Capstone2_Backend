const ReturnResult = require('../libs/ReturnResult');
const background_md = require('../models/background');
const Constants = require('../libs/Constants');
var sequelize = require("sequelize");

exports.randomBackground = function(req, res, next) {
  if (!req.userData.id) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }

  background_md
    .findAll({ order: [[sequelize.literal('RAND()')]], limit: 1})
    .then(function(result) {
      if (!result) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.NO_LINK_FOUND
          )
        );
      } else {
        return res.jsonp(
          new ReturnResult(
            result,
            null,
            'Get random background successfully',
            null
          )
        );
      }
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
};
