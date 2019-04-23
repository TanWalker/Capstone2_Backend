const ReturnResult = require('../libs/ReturnResult');
const background_md = require('../models/background');
const style_md = require('../models/style');
const Constants = require('../libs/Constants');
var sequelize = require('sequelize');

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
  //SELECT ALL STYLES
  style_md
    .findAll({ attributes: ['id', 'swim_name'] })
    .then(function(styles) {
      if (styles.length == null) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_STYLE
          )
        );
      } else {
        // select all background link
        var random = new Promise(function(resolve, reject) {
          background_md
            .findAll({ attributes: ['url'] })
            .then(function(background) {
              if (background.length == null) {
                return res.jsonp(
                  new ReturnResult(
                    'Error',
                    null,
                    null,
                    Constants.messages.NO_LINK_FOUND
                  )
                );
              } else {
                return resolve(background);
              }
            });
        });
        //add a random link into json of each object in styles array
        random.then(function(background) {
          var results = styles;
          for (var i = 0; i < results.length; i++) {
            // random an element from array 
            var tmp = Math.round(Math.floor(Math.random() * background.length));
            // creatr a new field 'url' in dataValues of each styles object
            results[i].dataValues.url = background[tmp].dataValues.url;
            // remove the element just random out of array
            background.splice(tmp, 1);
          }
          return res.jsonp(
            new ReturnResult(
              null,
              results,
              'Get random background successfully',
              null
            )
          );
        });
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
