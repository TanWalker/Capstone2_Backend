const ReturnResult = require('../libs/ReturnResult');
const library_md = require('../models/library');
const style_md = require('../models/style');
const Constants = require('../libs/Constants');
const common = require('../common/common');

exports.getYoutubeByStyleId = function(req, res, next) {
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

  var params = req.body;

  style_md.hasMany(library_md, { foreignKey: 'id' });
  library_md.belongsTo(style_md, { foreignKey: 'style_id' });

  library_md
    .findAll({
      where: { style_id: params.style_id },
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

exports.uploadLinkByStyleId = function(req, res, next) {
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
  library_md
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
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

exports.deleteLinkByStyleId = function(req, res, next) {
  console.log('Deleting lesson');

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
  var id = req.params.library_id;
  // find all lesson
  library_md
    .findOne({ where: { id: id } })
    .then(function(link) {
      if (link == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.LESSON_ID_INVALID
          )
        );
        return;
      }
      // delete lesson
      lessons.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete lesson successfully',
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
