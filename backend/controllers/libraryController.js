const ReturnResult = require('../libs/ReturnResult');
const technique_md = require('../models/technique');
const nutrition_md = require('../models/nutrition');
const style_md = require('../models/style');
const Constants = require('../libs/Constants');

//Technique
exports.getLinkTechniqueByStyleId = function(req, res, next) {
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

  style_md.hasMany(technique_md, { foreignKey: 'id' });
  technique_md.belongsTo(style_md, { foreignKey: 'style_id' });

  technique_md
    .findAll({
      where: { style_id: req.body.style_id },
      include: [{ model: style_md, as: 'style', attributes: ['swim_name'] }]
    })
    .then(function(results) {
      if (results.length == 0) {
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
          new ReturnResult(null, results, 'Get link successful', null)
        );
      }
    })
    .catch(function(err) {
      res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

exports.uploadLinkTechniqueByStyleId = function(req, res, next) {
  if (!req.userData.id || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
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
  // insert link to database
  technique_md
    .create({
      link: params.link,
      style_id: params.style_id
    })
    .then(function(result) {
      res.jsonp(new ReturnResult(result, null, 'Upload link successful', null));
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

exports.deleteLinkTechnique = function(req, res, next) {
  console.log('Deleting link');

  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
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
  var id = req.params.link_id;
  // find link
  technique_md
    .findOne({ where: { id: id } })
    .then(function(link) {
      if (link == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.LINK_ID_INVALID
          )
        );
        return;
      }
      // delete link
      link.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete link successfully',
        null
      );
      // return
      res.jsonp(result);
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

exports.getNewLinkTechnique = function(req, res, next) {
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
  // find and get new value inserted
  technique_md
    .findAll({ order: [['id', 'DESC']], limit: 5 })
    .then(function(results) {
      if (!results) {
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
          new ReturnResult(null, results, 'Get new link successfully', null)
        );
      }
    })
    .catch(function(err) {
      res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

//Nutrition 
exports.getLinkNutrition = function(req, res, next) {
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
  nutrition_md
    .findAll({
    })
    .then(function(results) {
      if (results.length == 0) {
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
          new ReturnResult(null, results, 'Get link successful', null)
        );
      }
    })
    .catch(function(err) {
      res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

exports.uploadLinkNutrition = function(req, res, next) {
  if (!req.userData.id || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
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
  // insert link to database
  nutrition_md
    .create({
      link: params.link
    })
    .then(function(result) {
      res.jsonp(new ReturnResult(result, null, 'Upload link successful', null));
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

exports.deleteLinkNutrition = function(req, res, next) {
  console.log('Deleting link');

  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
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
  var id = req.params.link_id;
  // find link
  nutrition_md
    .findOne({ where: { id: id } })
    .then(function(link) {
      if (link == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.LINK_ID_INVALID
          )
        );
        return;
      }
      // delete link
      link.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete link successfully',
        null
      );
      // return
      res.jsonp(result);
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

exports.getNewLinkNutrition = function(req, res, next) {
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
  // find and get new value inserted
  nutrition_md
    .findAll({ order: [['id', 'DESC']], limit: 5 })
    .then(function(results) {
      if (!results) {
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
          new ReturnResult(null, results, 'Get new link successfully', null)
        );
      }
    })
    .catch(function(err) {
      res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};



