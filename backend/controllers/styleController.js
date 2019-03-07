const ReturnResult = require("../libs/ReturnResult");
const style_md = require("../models/style");
const Constants = require("../libs/Constants");

// this function is get all style
exports.getStyle = function(req, res, next) {
  console.log("Getting all Style");

  // find all Style
  style_md.findAll().then(function(Styles) {
    // get result
    
    
    if (Object.keys(Styles).length == 1){
      return res.jsonp(
        new ReturnResult(Styles, null, "Get all style successful.", null)
      );
    }
    else{
      return res.jsonp(
        new ReturnResult(null, Styles, "Get all styles successful.", null)
      );
    }
    // return
    
  });
};

// this function is delete Style
exports.deleteStyle = function(req, res, next) {
  console.log("Deleting Style");
  // check for user is logged in
  if (!req.userData || req.userData.role_id == 3) {
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
    .then(function(Styles) {
      // delete Styles
      Styles.destroy();
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
  // check authorization if ==3 or null return unauthorized
  if (req.userData.role_id == 3 || !req.userData) {
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
    // Insert Style info to database //
    var result = style_md.create({
      swim_name: params.swim_name,
      description: params.description,
      coach_id: req.userData.id
    });
    result
      .then(function(Style) {
        //add the created Style  for return
        var result = {
          style: Style
        };
        
        res
          .status(200)
          .jsonp(new ReturnResult(result, null, "Style Created", null));
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
  if (!req.userData || req.userData.role_id == 3) {
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

    style_md.findOne({ where: { id: id } }).then(function(Styles) {
      if (Styles == null) {
        res.jsonp(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.STYLE_ID_INVILID
          )
        );
      } else {
        Styles.update({
          swim_name:
            params.swim_name == null ? Styles.swim_name : params.swim_name,
          description:
            params.description == null
              ? Styles.description
              : params.description,
          coach_id: params.coach_id == null ? Styles.coach_id : params.coach_id
        })
          .then(success => {
            res
              .status(200)
              .jsonp(
                new ReturnResult(null, null, "Update successful", null)
              );
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
  if (req.userData.role_id == 1 || req.userData.role_id == 2) {
    // Select all team by coach id
    style_md
      .findAll({
        where: { coach_id: req.userData.id }
      })
      .then(function(results) {
        var result = {
          list_style: results
        };
        
        if (Object.keys(results).length == 1){
          return res.jsonp(
            new ReturnResult(result, null, "Get style by coach successful.", null)
          );
        }
        else{
          return res.jsonp(
            new ReturnResult(null, result, "Get styles by coach successful.", null)
          );
        }
        
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
