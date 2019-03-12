const ReturnResult = require('../libs/ReturnResult');
const exercise_md = require('../models/exercise');
const Constants = require('../libs/Constants');
var sequelize = require('sequelize');

// this function is used to test ( get all exercise )
exports.getExercise = function(req, res, next) {
  console.log('Getting all Exercises');
  // check user is log in.
  if (!req.userData || req.userData.role_id == Constants.messages.ROLE_TRAINEE_ID) {
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
  // find all exercise
  exercise_md.findAll().then(function(exercises) {
    // get result
    return res.jsonp(
      new ReturnResult(null, exercises, 'Get exercises successful.', null)
    );
  });
};

// this function is delete exercise
exports.deleteExercise = function(req, res, next) {
  console.log('Deleting exercise');

  // check for use. If role_id == trainee || null, then reject
  if (req.userData.role_id == Constants.messages.ROLE_TRAINEE_ID || !req.userData) {
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
  var id = req.params.exercise_id;
  // find all exercise

  exercise_md
    .findOne({ where: { id: id } })
    .then(function(exercises) {
      if (exercises == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXERCISE_ID_INVALID
          )
        );
        return;
      }
      // delete exercises
      exercises.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete exercise successfully',
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

// this function is add new exercise
exports.addExercise = (req, res, next) => {
  // check authorization if user is admin or coach
  if (req.userData.role_id != Constants.messages.ROLE_TRAINEE_ID) {
    const params = req.body;
    var data = exercise_md.findOne({
      where: { name: params.name, coach_id: req.userData.id }
    });
    //   console.log(req.userData);
    // check whether existing exercise name
    data
      .then(function(data) {
        if (data) {
          return res.jsonp(
            new ReturnResult(
              'Error',
              null,
              null,
              Constants.messages.EXISTING_EXERCISE_NAME
            )
          );
        } else {
          // Insert exercise info to database //
          var result = exercise_md.create({
            name: params.name,
            style: params.style,
            distance: params.distance,
            reps: params.reps,
            coach_id: req.userData.id
          });
          result
            .then(function(exercise) {
              res
                .status(200)
                .jsonp(
                  new ReturnResult(exercise, null, 'Exercise Created', null)
                );
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
      })
      .catch(function(err) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.UNAUTHORIZED_USER
          )
        );
      });
  }
};

// this function is update exercise
exports.updateExercise = function(req, res, next) {
  console.log('Updating Exercise');

  //  check for use. If role_id == 3 || null, then reject.
  if (req.userData.role_id == Constants.messages.ROLE_TRAINEE_ID || !req.userData) {
    res.jsonp(
      new ReturnResult(
        'Error',
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
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXERCISE_ID_INVALID
          )
        );
      } else {
        exercises
          .update({
            name: params.name == null ? exercises.name : params.name,
            style_id:
              params.style_id == null ? exercises.style_id : params.style_id,
            distance_id:
              params.distance_id == null
                ? exercises.distance_id
                : params.distance_id,
            reps: params.reps == null ? exercises.reps : params.reps,
            date: params.date == null ? exercises.date : params.date
          })
          .then(success => {
            var result = {
              exercises: success
            };
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
  }
};

// Get exercise by coach
exports.getExerciseByCoach = function(req, res, next) {
  console.log('Get Exercise By Coach');
  if (req.userData.role_id != Constants.messages.ROLE_TRAINEE_ID) {
    // Select all team by coach id
    exercise_md
      .findAll({
        where: { coach_id: req.userData.id }
      })
      .then(function(results) {
        return res.jsonp(
          new ReturnResult(
            null,
            results,
            'Get exercises by coach successful.',
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
            Constants.messages.CAN_NOT_GET_EXERCISE
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

// Get exercise by id
exports.getExerciseByID = function(req, res, next) {
  // console.log("Get Exercise By ID");
  // console.log(req.params);
  if (req.userData.role_id != Constants.messages.ROLE_TRAINEE_ID) {
    // Select all team by  id
    exercise_md
      .findOne({
        where: { id: req.params.exercise_id }
      })
      .then(function(result) {
        if (result == null) {
          res.jsonp(
            new ReturnResult(
              'Error',
              null,
              null,
              Constants.messages.EXERCISE_ID_INVALID
            )
          );
          return;
        }
        return res.jsonp(
          new ReturnResult(result, null, 'Get exercise by ID successful.', null)
        );
      })
      .catch(function(err) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.CAN_NOT_GET_EXERCISE
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
