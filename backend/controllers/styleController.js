const ReturnResult = require("../libs/ReturnResult");
const style_md = require("../models/style");
const Constants = require("../libs/Constants");

// this function is get all style
exports.getStyle = function(req, res, next) {
  console.log("Getting all Style");

  // find all Style
  style_md.findAll().then(function(styles) {
    // get result

    return res.jsonp(
      new ReturnResult(null, styles, "Get all styles successful.", null)
    );

    // return
  });
};

// this function is delete Style
exports.deleteStyle = function(req, res, next) {
  console.log("Deleting Style");
  // check for user is logged in
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    res.jsonp(
      new ReturnResult(
        "Error",
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
  }
  // var id = req.body.id;
  var id = req.params.style_id;
  // find all Style
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
      // delete Styles
      style.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        "Delete Style successfully",
        null
      );
      // return
      res.jsonp(result);
    })
    .catch(function(err) {});
};
// Add swim style
exports.addStyle = (req, res, next) => {
  // check authorization if == trainee_id or null return unauthorized
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    res.jsonp(
      new ReturnResult(
        "Error",
        null,
        null,
        Constants.messages.INVALID_INFORMATION
      )
    );
    // else coach and admin can use this function below
  } else {
    const params = req.body;
    // console.log(params)
    // Insert Style info to database //
    var result = style_md.create({
      swim_name: params.swim_name,
      description: params.description,
      coach_id: req.userData.id
    });
    result
      .then(function(style) {
        //add the created Style  for return
        
        res
          .status(200)
          .jsonp(new ReturnResult(style, null, "Style Created", null));
      })
      .catch(function(err) {
        res.jsonp(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.INVALID_INFORMATION
          )
        );
      });
  }
};

// this function is update Style
exports.updateStyle = function(req, res, next) {
  console.log("Updating Style");

  // check authorization if ==3 or null return unauthorized
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    res.jsonp(
      new ReturnResult(
        "Error",
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    return;
    // else coach and admin can use the function below
  } else {
    const params = req.body;
    var id = params.id;

    style_md.findOne({ where: { id: id } }).then(function(style) {
      if (style == null) {
        res.jsonp(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.STYLE_ID_INVALID
          )
        );
      } else {
        style.update({
          swim_name:
            params.swim_name == null ? style.swim_name : params.swim_name,
          description:
            params.description == null
              ? style.description
              : params.description,
          coach_id: params.coach_id == null ? style.coach_id : params.coach_id
        })
          .then(success => {
            res
              .status(200)
              .jsonp(new ReturnResult(null, null, "Update successful", null));
            return;
          })
          .catch(function(err) {
            res.jsonp(
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
  }
};

// Get Style by coach
exports.getStyleByCoach = function(req, res, next) {
  console.log("Get Style By Coach");
  if (req.userData.role_id != Constants.ROLE_TRAINEE_ID ) {
    // Select all team by coach id
    style_md
      .findAll({
        where: { coach_id: req.userData.id }
      })
      .then(function(results) {
       

        return res.jsonp(
          new ReturnResult(
            null,
            results,
            "Get styles by coach successful.",
            null
          )
        );
      })
      .catch(function(err) {
        return res.jsonp(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.CAN_NOT_GET_EXERCISE
          )
        );
      });
  } else {
    return res.jsonp(
      new ReturnResult(
        "Error",
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
};
