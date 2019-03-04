const ReturnResult = require("../libs/ReturnResult");
const exercise_md = require("../models/exercise");
const exercise_time_md = require("../models/exercise_time");
const Constants = require("../libs/Constants");

// this function is used to test ( get all exercise )
exports.Get_Exercise = function(req, res, next) {
  console.log("Getting all Exercises");
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

  // find all exercise
  exercise_md.findAll().then(function(exercises) {
    // get result
    var result = new ReturnResult(null, exercises, "All exercises", null);

    // return
    res.jsonp(result);
  });
};

// this function is delete exercise , Eddy will create a trigger to delete all member of this exercise when we delete exercise
exports.Delete_Exercise = function(req, res, next) {
  console.log("Deleting exercise");

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
  // find all exercise
  console.log(id);
  exercise_md
    .findOne({ where: { id: id } })
    .then(function(exercises) {
      // delete exercises
      exercises.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        "Delete exercise successfully",
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
exports.Add_Exercise = (req, res, next) => {
  // check authorization if user is admin or coach
  if (req.userData.role_id == 1 || req.userData.role_id == 2) {
    const params = req.body;
    var data = exercise_md.findOne({ where: { name: params.name } });
    //   console.log(req.userData);
    // check whether existing exercise name
    data.then(function(data) {
      if (data) {
        return res.json(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.EXISTING_EXERCISE_NAME
          )
        );
      } else {
        // Insert exercise info to database //
        var result = exercise_md.create({
          name: params.name,
          style_id: params.style_id,
          distance_id: params.distance_id,
          reps: params.reps
        });
        result
          .then(function(exercises) {
            exercise_time_md.create({
                start: params.start,
                end: params.end,
                exercise_id: exercises.id
              }).then(function(times){
                  var result = {
                    exercises: exercises,
                    time: times
                  };
                  res
                    .status(200)
                    .json(new ReturnResult(null, result, "Exercise Created", null));
              });
              
            //add the created exercise for return
            
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

// this function is update exercise
exports.Update_Exercise = function(req, res, next) {
  console.log("Updating Exercise");

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

    exercise_md.findOne({ where: { id: id } }).then(function(exercises) {
      if (exercises == null) {
        res.json(
          new ReturnResult(
            "Error",
            null,
            null,
            Constants.messages.EXERCISE_ID_INVILID
          )
        );
      } else {
        exercises.update({
          name:
            params.name == null ? exercises.name : params.name,
          style_id:
            params.style_id == null ? exercises.style_id : params.style_id,
          distance_id:
            params.distance_id == null ? exercises.distance_id : params.distance_id,
          reps:
            params.reps == null ? exercises.reps : params.reps,
          date:
            params.date == null ? exercises.date: params.date
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
