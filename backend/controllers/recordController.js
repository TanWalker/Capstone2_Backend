const ReturnResult = require('../libs/ReturnResult');
const record_md = require('../models/record');
const Constants = require('../libs/Constants');
const date_md = require('../models/date');
const Op = require('sequelize').Op;
const exercise_md = require('../models/exercise');
const moment = require('moment-timezone');
const mrecord_md = require('../models/monthly_record');
const schedule_md = require('../models/schedule');
const user_md = require('../models/user');
exports.getRecord = function(req, res, next) {
  console.log('Getting all records');
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
  record_md.findAll().then(function(records) {
    // get result
    return res.jsonp(
      new ReturnResult(null, records, 'Get all records successful.', null)
    );
  });
};

//add record
exports.addDailyRecord = function(req, res, next) {
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
  // if not continue to add record
  const params = req.body;
  // Insert record info to database
  var result = record_md.create({
    user_id: params.user_id,
    min_time: params.min_time,
    max_time: params.max_time,
    time_swim: params.time_swim,
    min_hr: params.min_hr,
    max_hr: params.max_hr,
    heart_rate: params.heart_rate,
    attitude: params.attitude,
    schedule_id: params.schedule_id,
    result: params.result,
    note: params.note,
    best_result: params.best_result,
    errors: params.errors,
    coach_id: req.userData.id,
    exercise_id: params.exercise_id
  });
  result
    .then(function(record) {
      // if success return this record and message
      res
        .status(200)
        .jsonp(new ReturnResult(record, null, 'Record Created', null));
    })
    .catch(function(err) {
      //catch error
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
// function deleteRecord
exports.deleteRecord = function(req, res, next) {
  console.log('Deleting Record');

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

  // find if record_id is existing
  record_md
    .findOne({ where: { id: req.params.record_id } })
    .then(function(record) {
      //check if record was found or not.
      if (record == null) {
        // not found, it's return invalid record id and exit
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.RECORD_ID_INVALID
          )
        );
        return;
      }
      // it was found and be destroy
      record.destroy();
      // generate successful message result
      var result = new ReturnResult(
        null,
        null,
        'Delete record successfully',
        null
      );
      // return result
      res.jsonp(result);
    })
    .catch(function(err) {
      //catch error
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
// function for update an record
exports.updateRecord = function(req, res, next) {
  console.log('Updating Record');

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
  // check if record id is exist or not.
  record_md.findOne({ where: { id: params.id } }).then(function(record) {
    if (record == null) {
      res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.RECORD_ID_INVALID
        )
      );
    } else {
      // if record id is exist so we update it.
      record
        .update({
          user_id: params.user_id == null ? record.user_id : params.user_id,
          min_time: params.min_time == null ? record.min_time : params.min_time,
          max_time: params.max_time == null ? record.max_time : params.max_time,
          time_swim:
            params.time_swim == null ? record.time_swim : params.time_swim,
          min_hr: params.min_hr == null ? record.min_hr : params.min_hr,
          max_hr: params.max_hr == null ? record.max_hr : params.max_hr,
          heart_rate:
            params.heart_rate == null ? record.heart_rate : params.heart_rate,
          attitude: params.attitude == null ? record.attitude : params.attitude,
          schedule_id:
            params.schedule_id == null
              ? record.schedule_id
              : params.schedule_id,
          result: params.result == null ? record.result : params.result,
          note: params.note == null ? record.note : params.note,
          best_result:
            params.best_result == null
              ? record.best_result
              : params.best_result,
          errors: params.errors == null ? record.errors : params.errors
        })
        .then(success => {
          // if update successfully, return it.
          res
            .status(200)
            .jsonp(new ReturnResult(success, null, 'Update successful', null));
          return;
        })
        .catch(function(err) {
          //catch error.
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

//get record by user, schedule, exercise

exports.getRecordByUserScheduleExercise = function(req, res, next) {
  console.log('Get Lesson By Date');
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
  record_md
    .findAll({
      where: {
        user_id: req.body.user_id,
        schedule_id: req.body.schedule_id,
        exercise_id: req.body.exercise_id
      }
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.INVALID_INFORMATION
          )
        );
        return;
      }
      // found it and return result
      return res.jsonp(
        new ReturnResult(null, result, 'Get record successful.', null)
      );
    })
    .catch(function(err) {
      //catch err
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

//get record by month, year of current user
exports.getRecordByMonthYearOfCurrentUser = function(req, res, next) {
  console.log('Get record by month, year of current user');
  //check if user is logged in, return and exit;
  if (!req.userData) {
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
  // Select record by month, year of current user
  // date_md
  //   .findAll({
  //     attributes: ['schedule_id'],
  //     where: {
  //       month: req.body.month,
  //       year: req.body.year
  //     }
  //   })
  //   .then(function(result) {
  // var list = [];
  // Object.keys(result).forEach(function(key) {
  //   list.push(result[key].schedule_id); // push
  // });
  // Left join
  exercise_md.hasMany(record_md, { foreignKey: 'id' });
  record_md.belongsTo(exercise_md, { foreignKey: 'exercise_id' });
  schedule_md.hasMany(record_md, { foreignKey: 'id' });
  record_md.belongsTo(schedule_md, { foreignKey: 'schedule_id' });
  // Select record by result above
  record_md
    .findAll({
      where: {
        user_id: req.userData.id
      },
      include: [
        {
          model: exercise_md,
          as: 'exercise'
        },
        {
          model: schedule_md,
          as: 'schedule',
          attributes: ['id'],
          where: {
            month: req.body.month,
            year: req.body.year
          }
        }
      ],
      group: ['record.exercise_id']
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.NO_RECORD_FOUND
          )
        );
        return;
      }
      // found it and return result
      return res.jsonp(
        new ReturnResult(
          null,
          result,
          'Get record by month year successful.',
          null
        )
      );
    })
    .catch(function(err) {
      //catch err
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
  // });
};

//get record by year of current user
exports.getRecordByYearOfCurrentUser = function(req, res, next) {
  console.log('Get record by year of current user');
  //check if user is logged in, return and exit;
  if (!req.userData) {
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
  // Select record by month, year of current user
  // date_md
  //   .findAll({
  //     attributes: ['schedule_id'],
  //     where: {
  //       year: req.body.year
  //     }
  //   })
  //   .then(function(result) {
  //     var list = [];
  //     Object.keys(result).forEach(function(key) {
  //       list.push(result[key].schedule_id); // push
  //     });

  // Left join
  exercise_md.hasMany(mrecord_md, { foreignKey: 'id' });
  mrecord_md.belongsTo(exercise_md, { foreignKey: 'exercise_id' });
  // Select record by result above
  mrecord_md
    .findAll({
      where: {
        user_id: req.userData.id,
        year : req.body.year
      },
      include: [
        {
          model: exercise_md,
          as: 'exercise'
        },
      ],
      group: ['monthly_record.exercise_id']
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.NO_RECORD_FOUND
          )
        );
        return;
      }
      // found it and return result
      return res.jsonp(
        new ReturnResult(null, result, 'Get record by year successful.', null)
      );
    })
    .catch(function(err) {
      //catch err
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
  // });
};

//get record by id
exports.getRecordByID = function(req, res, next) {
  console.log('Get record by year of current user');
  //check if user is logged in, return and exit;
  if (!req.userData) {
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
  // Left join
  exercise_md.hasMany(record_md, { foreignKey: 'id' });
  record_md.belongsTo(exercise_md, { foreignKey: 'exercise_id' });
  // Select record by  id
  record_md
    .findOne({
      where: { id: req.params.record_id },
      include: [
        {
          model: exercise_md,
          as: 'exercise'
        }
      ]
    })
    .then(function(result) {
      if (result == null) {
        // not found any thing.
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.RECORD_ID_INVALID
          )
        );
        return;
      }
      // if found, return it
      return res.jsonp(
        new ReturnResult(result, null, 'Get record by ID successful.', null)
      );
    })
    .catch(function(err) {
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};

//get record by month of year
exports.getListRecordByMonthOfYear = function(req, res, next) {
  if (!req.userData) {
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
  // var firstDay = new Date(req.body.year, req.body.month - 1, 1);
  // var lastDay = new Date(req.body.year, req.body.month, 0);

  // firstDay = moment(firstDay).format();
  // lastDay = moment(lastDay).format();
  schedule_md.hasMany(record_md, { foreignKey: 'id' });
  record_md.belongsTo(schedule_md, { foreignKey: 'schedule_id' });

  exercise_md.hasMany(record_md, { foreignKey: 'id' });
  record_md.belongsTo(exercise_md, { foreignKey: 'exercise_id' });

  user_md.hasMany(exercise_md, { foreignKey: 'id' });
  exercise_md.belongsTo(user_md, { foreignKey: 'coach_id' });

  record_md
    .findAll({
      where: {
        user_id: req.userData.id,
        exercise_id: req.body.exercise_id
        //createdAt: { [Op.between]: [firstDay, lastDay] }
      },
      include: [
        {
          model: schedule_md,
          as: 'schedule',
          attributes: ['day', 'month', 'year'],
          where: { month: req.body.month, year: req.body.year }
        },
        {
          model: exercise_md,
          as: 'exercise',
          include: [
            {
              model: user_md,
              as: 'user',
              attributes: ['display_name']
            }
          ]
        }
      ]
    })
    .then(function(results) {
      if (results.length == 0) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.RECORD_NOT_FOUND
          )
        );
      } else {
        return res.jsonp(
          new ReturnResult(null, results, 'Get List Records Success', null)
        );
      }
    })
    .catch(function(err) {
      //catch err
      return res.jsonp(
        new ReturnResult(
          err.messages,
          null,
          null,
          Constants.messages.INVALID_INFORMATION
        )
      );
    });
};


