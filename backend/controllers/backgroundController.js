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

  style_md
    .findAll()
    .then(function(styles) {
      if (styles.length == null) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.NO_LINK_FOUND
          )
        );
      } else {
        var random = new Promise(function(resolve, reject) {
          background_md
            .findAll({attributes: ['url']})
            .then(function(background) {
              
              return resolve(background);
            });
        });
        
        random.then(function(background){
          
          var results = styles;
          for (var i = 0; i < results.length; i++) {
            var tmp = Math.round(Math.floor(Math.random()*background.length));
            console.log(tmp);
            results[i].dataValues.url = background[tmp].dataValues.url;
            //console.log(ok);
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
