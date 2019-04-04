const ReturnResult = require('../libs/ReturnResult');
const lessonExercise_md = require('../models/lesson_exercise');
const exercise_md = require('../models/exercise');
const Constants = require('../libs/Constants');
const common = require('../common/common');

// this function is used to test ( get all lesson )
exports.getLessonExercise = function(req, res, next) {
  console.log('Getting all lesson exercise');
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
  // find all lesson
  lessonExercise_md.findAll().then(function(lesson_exercises) {
    // get result
    return res.jsonp(
      new ReturnResult(
        null,
        lesson_exercises,
        'Get lesson excercise successful.',
        null
      )
    );
  });
};

// this function is delete lesson
exports.deleteLessonExercise = function(req, res, next) {
  console.log('Deleting lesson excercise');

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
  var id = req.params.lesson_exercise_id;
  // find all exercise
  lessonExercise_md
    .findOne({ where: { id: id } })
    .then(function(lesson_exercises) {
      if (lesson_exercises == null) {
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
      // delete lesson exercise
      lesson_exercises.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete lesson excercise successfully',
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
exports.addLessonExercise = (req, res, next) => {
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
  } else {
    const params = req.body;
    // Insert lesson exercise info to database
    var result = lessonExercise_md.create({
      lesson_id: params.lesson_id,
      exercise_id: params.exercise_id,
      type_of_exercise_id: params.type_of_exercise_id,
      is_important: common.convertBoolean(params.is_important)
    });
    result
      .then(function(lesson_exercise) {
        // return success message and this lesson exercise
        res
          .status(200)
          .jsonp(
            new ReturnResult(
              lesson_exercise,
              null,
              'Lesson Exercise Created',
              null
            )
          );
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
};

// this function is update lesson excercise
exports.updateLessonExercise = function(req, res, next) {
  console.log('Updating Lesson Exercise');

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
  // check if lesson excercise id is exist or not.
  lessonExercise_md
    .findOne({ where: { id: params.id } })
    .then(function(lesson_exercises) {
      if (lesson_exercises == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXERCISE_ID_INVALID
          )
        );
      } else {
        // if lesson execise id is exist so we update it.
        lesson_exercises
          .update({
            lesson_id:
              params.lesson_id == null
                ? lesson_exercises.lesson_id
                : params.lesson_id,
            exercise_id:
              params.exercise_id == null
                ? lesson_exercises.exercise_id
                : params.exercise_id,
            type_of_exercise_id:
              params.type_of_exercise_id == null
                ? lesson_exercises.type_of_exercise_id
                : params.type_of_exercise_id,
            is_important:
              params.is_important == null
                ? lesson_exercises.is_important
                : common.convertBoolean(params.is_important)
          })
          .then(success => {
            // if update successfully, return it.
            res
              .status(200)
              .jsonp(
                new ReturnResult(success, null, 'Update successful', null)
              );
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

// Get lesson exercise by id
exports.getLessonExerciseByID = function(req, res, next) {
  console.log('Get Lesson Exercise By ID');
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
  // Select lesson exercises by id
  lessonExercise_md
    .findOne({
      where: { id: req.params.lesson_exercise_id }
    })
    .then(function(result) {
      if (result == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.LESSON_EXERCISE_ID_INVALID
          )
        );
        return;
      }
      return res.jsonp(
        new ReturnResult(
          result,
          null,
          'Get lesson excercise by ID successful.',
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
          Constants.messages.CAN_NOT_GET_LESSON_EXERCISE
        )
      );
    });
};

exports.getLessonExerciseByLessonID = function(req, res, next) {
  console.log('Get Lesson Exercise By Lesson ID');
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
  // Select lesson exercises by lesson_id
  lessonExercise_md
    .findAll({
      where: { lesson_id: req.params.lesson_id }
    })
    .then(function(result) {
      if (result == null) {
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
      var list = [];
      Object.keys(result).forEach(function(key) {
        result[key].is_important = common.convertBoolean(
          result[key].is_important
        );
        list.push(result[key].exercise_id);
      });
      exercise_md.findAll({ where: { id: list } }).then(function(results) {
        return res.jsonp(
          new ReturnResult(
            null,
            results,
            'Get lesson excercise by lesson_ID successful.',
            null
          )
        );
      });
    })
    .catch(function(err) {
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.CAN_NOT_GET_LESSON_EXERCISE
        )
      );
    });
};
exports.deleteLessonExerciseByLessonID = function(req, res, next) {
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
  // check if lesson excercise id is exist or not.
  lessonExercise_md
    .findAll({

      where: { lesson_id: req.params.lesson_id }
    })
    .then(function(result) {
      console.log(result);
      // check result if it existing or not
      if (result.length == 0) {
        // not found
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
      // found it and push lesson_id to list
      var list = [];
      Object.keys(result).forEach(function(key) {
        list.push(result[key].lesson_id); // push
      });
      // find lesson exercise information by list lesson_id
      console.log(list);
      lessonExercise_md
        .destroy({ where: { lesson_id: list }})
        .then(function(results) {
          //return result
          return res.jsonp(
            new ReturnResult(null, results, 'Delete successful.', null)
          );
        });
    })
    .catch(function(err) {
      //catch err
      return res.jsonp(
        new ReturnResult(
          err.message,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};