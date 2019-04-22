const ReturnResult = require('../libs/ReturnResult');
const style_md = require('../models/style');
const Constants = require('../libs/Constants');

// this function is get all style
exports.getStyle = function(req, res, next) {
  console.log('Getting all Style');
  // find all Style
  style_md.findAll().then(function(styles) {
    // return result
    return res.jsonp(
      new ReturnResult(null, styles, 'Get all styles successful.', null)
    );
  });
};

// this function is delete Style
exports.deleteStyle = function(req, res, next) {
  console.log('Deleting Style');
  //check if user is trainee, return and exit;
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
  var id = req.params.style_id;
  // check if style id is existing
  style_md
    .findOne({ where: { id: id } })
    .then(function(style) {
      if (style == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.STYLE_ID_INVALID
          )
        );
        return;
      }
      // Delete this style
      style.destroy();
      // generate result
      var result = new ReturnResult(
        null,
        null,
        'Delete Style successfully',
        null
      );
      // return it
      res.jsonp(result);
    })
    .catch(function(err) {});
};
// Add swim style
exports.addStyle = (req, res, next) => {
  //check if user is trainee, return and exit;
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

  const params = req.body;
  // Insert style info to database
  var result = style_md.create({
    swim_name: params.swim_name,
    description: params.description,
    coach_id: req.userData.id
  });
  //then result
  result
    .then(function(style) {
      //return successful message and created style.
      res
        .status(200)
        .jsonp(new ReturnResult(style, null, 'Style Created', null));
    })
    .catch(function(err) {
      //if fail return error messages
      res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

// this function is update Style
exports.updateStyle = function(req, res, next) {
  console.log('Updating Style');

  //check if user is trainee, return and exit;
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
  const params = req.body;
  //check if style id is existing
  style_md.findOne({ where: { id: params.id } }).then(function(style) {
    if (style == null) {
      //if null return
      res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.STYLE_ID_INVALID
        )
      );
    } else {
      style
        .update({
          swim_name:
            params.swim_name == null ? style.swim_name : params.swim_name,
          description:
            params.description == null ? style.description : params.description,
          coach_id: params.coach_id == null ? style.coach_id : params.coach_id
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
};

// Get Style by coach
exports.getStyleByCoach = function(req, res, next) {
  console.log('Get Style By Coach');
  if (req.userData.role_id != Constants.ROLE_TRAINEE_ID) {
    // Select all styles by coach id
    style_md
      .findAll({
        where: { coach_id: req.userData.id }
      })
      .then(function(results) {
        return res.jsonp(
          new ReturnResult(
            null,
            results,
            'Get styles by coach successful.',
            null
          )
        );
      })
      .catch(function(err) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_STYLE
          )
        );
      });
  } else {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
};

// get style by id
exports.getStyleById = function(req, res, next) {
  console.log('Get Style By ID');
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
  // Select all style by id
  style_md
    .findOne({
      where: { id: req.params.style_id }
    })
    .then(function(result) {
      if (!result) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_STYLE
          )
        );
      } else {
        return res.jsonp(
          new ReturnResult(result, null, 'Get Style by ID successfully')
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
