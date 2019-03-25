const ReturnResult = require('../libs/ReturnResult');
const exercise_md = require('../models/exercise');
const Constants = require('../libs/Constants');
const lesson_exercise_md = require('../models/lesson_exercise');
const Op = require('sequelize').Op;
// this function is used to test ( get all exercise )
exports.getExercise = function(req, res, next) {
  console.log('Getting all Exercises');
  // check user is log in.
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
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
  // check whether exercise is existing by name and coach_id
  var data = exercise_md.findOne({
    where: { name: params.name, coach_id: req.userData.id }
  });

  data.then(function(data) {
    // check if the exercise was found or not
    if (data) {
      // not found
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.EXISTING_EXERCISE_NAME
        )
      );
    } else {
      // found
      // Insert exercise info to database
      var result = exercise_md.create({
        name: params.name,
        style: params.style,
        distance: params.distance,
        reps: params.reps,
        coach_id: req.userData.id,
        description: params.description,
        time: params.time,
        type_id: params.type_id
      });
      result
        .then(function(exercise) {
          // return success message and this exercise
          res
            .status(200)
            .jsonp(new ReturnResult(exercise, null, 'Exercise Created', null));
        })
        .catch(function(err) {
          //catch error
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

// this function is update exercise
exports.updateExercise = function(req, res, next) {
  console.log('Updating Exercise');

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
  // set params is request body.
  const params = req.body;
  // check if exercise id is exist or not.
  exercise_md.findOne({ where: { id: params.id } }).then(function(exercises) {
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
      // if execise id is exist so we update it.
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
          date: params.date == null ? exercises.date : params.date,
          description:
            params.description == null
              ? exercises.description
              : params.description,
          time: params.time == null ? exercises.time : params.time,
          type_id: params.type_id == null ? exercises.type_id : params.type_id
        })
        .then(success => {
          // if update successfully, return it.
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

// Get exercise by coach
exports.getExerciseByCoach = function(req, res, next) {
  console.log('Get Exercise By Coach');
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
  // Select all exercise by coach id
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
};

// Get exercise by id
exports.getExerciseByID = function(req, res, next) {
  console.log('Get Exercise By ID');
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
};

// Get final set exercises by lesson_id
exports.getExerciseByLessonID = function(req, res, next) {
  console.log('Get list Exercise By Lesson ID');
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
  //select all exercise_id by lesson
  lesson_exercise_md
    .findAll({
      attributes: ['exercise_id'],
      where: {
        lesson_id: req.body.lesson_id,
        type_of_exercise_id: Constants.FINAL_SET_ID
      }
    })
    .then(function(result) {
      // check if result is null or not
      if (result.length == 0) {
        // not found
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.LESSON_ID_INVALID
          )
        );
      }
      //found it.
      var list = []; // create array of exercise_id
      Object.keys(result).forEach(function(key) {
        list.push(result[key].exercise_id); // push exercise_id to array
      });
      // find all information of exercise by list exercise_id
      exercise_md
        .findAll({
          where: {
            id: {
              [Op.or]: list
            }
          }
        })
        .then(function(results) {
          // return result
          res.jsonp(
            new ReturnResult(
              null,
              results,
              'Get list exercises by Lesson ID successful',
              null
            )
          );
        })
        .catch(function(err) {
          //catch err.
          return res.jsonp(
            new ReturnResult(
              'Error',
              null,
              null,
              Constants.messages.CAN_NOT_GET_EXERCISE
            )
          );
        });
    });
};
