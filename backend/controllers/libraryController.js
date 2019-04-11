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
      return res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};
