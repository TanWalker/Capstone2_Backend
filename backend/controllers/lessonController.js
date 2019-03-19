const ReturnResult = require('../libs/ReturnResult');
const lesson_md = require('../models/lesson');
const Constants = require('../libs/Constants');

// this function is used to test ( get all lesson )
exports.getLesson = function(req, res, next) {
  console.log('Getting all lessons');
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
  lesson_md.findAll().then(function(lessons) {
    // get result
    return res.jsonp(
      new ReturnResult(null, lessons, 'Get lessons successful.', null)
    );
  });
};

// this function is delete lesson
exports.deleteLesson = function(req, res, next) {
  console.log('Deleting lesson');

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
  var id = req.params.lesson_id;
  // find all lesson
  lesson_md
    .findOne({ where: { id: id } })
    .then(function(lessons) {
      if (lessons == null) {
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
      // delete lesson
      lessons.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete lesson successfully',
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

// this function is add new lesson
exports.addLesson = (req, res, next) => {
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
  var data = lesson_md.findOne({
    where: { name: params.name, coach_id: req.userData.id }
  });

  data.then(function(data) {
    // check if the lesson was found or not
    if (data) {
      // not found
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.EXISTING_LESSON_NAME
        )
      );
    } else {
      // Insert lesson info to database
      var result = lesson_md.create({
        name: params.name,
        coach_id: req.userData.id
      });
      result
        .then(function(lesson) {
          // return success message and this lesson
          res
            .status(200)
            .jsonp(new ReturnResult(lesson, null, 'Exercise Created', null));
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

// this function is update lesson
exports.updateLesson = function(req, res, next) {
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
  // check if lesson id is exist or not.
  lesson_md
  .findOne({ where: { id: params.id } }).then(function(lesson) {
    if (lesson == null) {
      res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.LESSON_ID_INVALID
        )
      );
    } else {
      // if execise id is exist so we update it.
      lesson
        .update({
          name: params.name == null ? lesson.name : params.name,
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
exports.getLessonByCoach = function(req, res, next) {
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
  lesson_md
    .findAll({
      where: { coach_id: req.userData.id }
    })
    .then(function(results) {
      return res.jsonp(
        new ReturnResult(
          null,
          results,
          'Get lesson by coach successful.',
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
          Constants.messages.CAN_NOT_GET_LESSON
        )
      );
    });
};

// Get lessons by id
exports.getLessonByID = function(req, res, next) {
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
  // Select all lessons by  id
  lesson_md
    .findOne({
      where: { id: req.params.lesson_id }
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
      return res.jsonp(
        new ReturnResult(result, null, 'Get lesson by ID successful.', null)
      );
    })
    .catch(function(err) {
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.CAN_NOT_GET_LESSON
        )
      );
    });
};
