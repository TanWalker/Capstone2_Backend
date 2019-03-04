const ReturnResult = require("../libs/ReturnResult");
const lesson_md = require("../models/lesson_plan");
const Constants = require("../libs/Constants");

// this function is used to test ( get all Lesson )
exports.Get_Lesson = function(req, res, next) {
  console.log("Getting all Lesson");
  // check user
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

  // find all Lesson
  lesson_md.findAll().then(function(Lessons) {
    // get result
    var result = new ReturnResult(null, Lessons, "All Lessons", null);

    // return
    res.jsonp(result);
  });
};

// this function is delete Lesson , Eddy will create a trigger to delete all member of this Lesson when we delete Lesson
exports.Delete_Lesson = function(req, res, next) {
  console.log("Deleting Lesson");

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
  // find all Lesson
  console.log(id);
  lesson_md
    .findOne({ where: { id: id } })
    .then(function(Lessons) {
      // delete Lessons
      Lessons.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        "Delete lesson successfully",
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
exports.Add_Lesson = (req, res, next) => {
  // check authorization if user is admin or coach
  if (req.userData.role_id == 1 || req.userData.role_id == 2) {
    const params = req.body;
    var data = lesson_md.findOne({ where: { name: params.name } });
    //   console.log(req.userData);
    // check whether existing Lesson name
    data.then(function(data) {
      if (data) {
        return res.json(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.EXISTING_LESSON_NAME
          )
        );
      } else {
        // Insert Lesson info to database //
        var result = lesson_md.create({
          name: params.name,
          style_id: params.style_id,
          distance_id: params.distance_id,
          repetition: params.repetition,
          description: params.description
        });
        result
          .then(function(Lesson) {
            // console.log(Lesson);
            //add the created lesson plan for return
            var result = {
              lesson_plan: Lesson
            };
            res
              .status(200)
              .json(new ReturnResult(null, result, "Lesson Created", null));
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

// this function is update Lesson
exports.Update_Lesson = function(req, res, next) {
  console.log("Updating Lesson");

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

    lesson_md.findOne({ where: { id: id } }).then(function(Lessons) {
      if (Lessons == null) {
        res.json(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.LESSON_ID_INVILID
          )
        );
      } else {
        Lessons.update({
          name: params.name == null ? Lessons.name : params.name,
          style_id:
            params.style_id == null ? Lessons.style_id : params.style_id,
          distance_id:
            params.distance_id == null
              ? Lessons.distance_id
              : params.distance_id,
          repetition:
            params.repetition == null ? Lessons.repetition : params.repetition,
          description:
            params.description == null
              ? Lessons.description
              : params.description
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
