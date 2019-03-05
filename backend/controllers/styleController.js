const ReturnResult = require("../libs/ReturnResult");
const style_md = require("../models/style");
const Constants = require("../libs/Constants");

// this function is used to test ( get all Style )
exports.Get_Style = function(req, res, next) {
  console.log("Getting all Style");
  // check user are logged in
  if (!req.userData) {
    res
      .status(401)
      .jsonp(
        new ReturnResult(
          "Error",
          null,
          null,
          Constants.messages.UNAUTHORIZED_USER
        )
      );
    return;
  }

  // find all Style
  style_md.findAll().then(function(Styles) {
    // get result
    var result = new ReturnResult(null, Styles, "All Styles", null);

    // return
    res.jsonp(result);
  });
};

// this function is delete Style , Eddy will create a trigger to delete all member of this Style when we delete Style
exports.Delete_Style = function(req, res, next) {
  console.log("Deleting Style");

  // check for user
  if (!req.userData) {
    res
      .status(401)
      .jsonp(
        new ReturnResult(
          "Error",
          null,
          null,
          Constants.messages.UNAUTHORIZED_USER
        )
      );
    return;
  }
  var id = req.body.id;
  // find all Style
  //   console.log(id);
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
    .catch(function(err) {
      res.json(
        new ReturnResult(
          err.message,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};
// Add swim style
exports.Add_Style = (req, res, next) => {
  // check authorization if user is admin or coach
  if (req.userData.role_id == 1 || req.userData.role_id == 2) {
    const params = req.body;
    var data = style_md.findOne({ where: { swim_name: params.swim_name } });
    //   console.log(req.userData);
    // check whether existing Style name
    data.then(function(data) {
      if (data) {
        return res.json(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.EXISTING_STYLE_NAME
          )
        );
      } else {
        // Insert Style info to database //
        var result = style_md.create({
          swim_name: params.swim_name,
          description: params.description
        });
        result
          .then(function(Style) {
            //add the created Style  for return
            var result = {
              style: Style
            };
            res
              .status(200)
              .json(new ReturnResult(null, result, "Style Created", null));
          })
          .catch(function(err) {
            res.json(
              new ReturnResult(
                err.message,
                null,
                null,
                Constants.messages.INVALID_INFORMATION
              )
            );
          });
      }
    });
  } else {
    return res.json(
      new ReturnResult(
        "Error",
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
};

// this function is update Style
exports.Update_Style = function(req, res, next) {
  console.log("Updating Style");

  // check for user is logged in
  if (!req.userData) {
    res
      .status(401)
      .jsonp(
        new ReturnResult(
          "Error",
          null,
          null,
          Constants.messages.UNAUTHORIZED_USER
        )
      );
    return;
  } else {
    const params = req.body;
    var id = params.id;

    style_md.findOne({ where: { id: id } }).then(function(Styles) {
      if (Styles == null) {
        res.json(
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
            params.description == null ? Styles.description : params.description
        })
          .then(success => {
            res
              .status(200)
              .jsonp(
                new ReturnResult(null, success, "Update successful", null)
              );
            return;
          })
          .catch(function(err) {
            res.json(
              new ReturnResult(
                err.message,
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
