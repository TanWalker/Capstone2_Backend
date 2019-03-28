const ReturnResult = require('../libs/ReturnResult');
const schedule_md = require('../models/schedule');
const Constants = require('../libs/Constants');
const moment = require('moment-timezone');
const sequelize = require('sequelize');
const lesson_md = require('../models/lesson');
// not finish yet.

// this function is used to test ( get all Schedule )
exports.getSchedule = function(req, res, next) {
  console.log('Getting all Schedule');
  // check user
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

  // find all Schedule
  schedule_md
    .findAll({ where: { coach_id: req.userData.id } })
    .then(function(schedules) {
      Object.keys(schedules).forEach(function(key) {
        var start = moment(schedules[key].time_start).tz('Asia/Ho_Chi_Minh');
        var end = moment(schedules[key].time_end).tz('Asia/Ho_Chi_Minh');
        schedules[key].time_start = start.format();
        schedules[key].time_end = end.format();
      });

      // get result
      var result = new ReturnResult(null, schedules, 'All Schedules', null);
      // return
      return res.jsonp(result);
    });
};

// this function is delete Schedule , Eddy will create a trigger to delete all member of this Schedule when we delete Schedule
exports.deleteSchedule = function(req, res, next) {
  console.log('Deleting Schedule');

  // check for user
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
  var id = req.body.id;
  // find all Schedule
  console.log(id);
  schedule_md
    .findOne({ where: { id: id } })
    .then(function(schedule) {
      // delete Schedules
      schedule.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete schedule successfully',
        null
      );
      // return
      res.jsonp(result);
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
};

//add Schedule
exports.addSchedule = (req, res, next) => {
  // check authorization
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
    // else the user can add
  } else {
    const params = req.body;
    var time_start = new Date();
    var time_end = new Date();
    time_start.setFullYear(params.year, params.month - 1, params.day);
    time_start.setHours(params.start_hour, params.start_minute, 0);
    time_end.setFullYear(params.year, params.month - 1, params.day);
    time_end.setHours(params.end_hour, params.end_minute, 0);
    // Insert Schedule info to database
    var result = schedule_md.create({
      start_hour: params.start_hour,
      end_hour: params.end_hour,
      lesson_id: params.lesson_id,
      coach_id: req.userData.id,
      team_name: params.team_name,
      day: params.day,
      month: params.month,
      year: params.year,
      start_minute: params.start_minute,
      end_minute: params.end_minute,
      time_start: time_start,
      time_end: time_end,
      team_id: params.team_id,
      lesson_name: params.lesson_name
    });
    result
      .then(function(schedule) {
        //add the created Schedule plan for return
        res
          .status(200)
          .jsonp(new ReturnResult(schedule, null, 'Schedule Created', null));
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
  }
};

// this function is update Schedule
exports.updateSchedule = function(req, res, next) {
  console.log('Updating Schedule');

  // check for user is logged in
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
  } else {
    const params = req.body;
    var id = params.id;
    schedule_md.findOne({ where: { id: id } }).then(function(schedules) {
      // if no schedule found
      if (schedules == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.SCHEDULE_ID_INVALID
          )
        );
      } else {
        var time_start = new Date();
        var time_end = new Date();
        time_start.setFullYear(
          params.year == null ? schedules.year : params.year,
          params.month == null ? schedules.month - 1 : params.month - 1,
          params.day == null ? schedules.day : params.day
        );
        time_start.setHours(
          params.start_hour == null ? schedules.start_hour : params.start_hour,
          params.start_minute == null
            ? schedules.start_minute
            : params.start_minute,
          0
        );
        time_end.setFullYear(
          params.year == null ? schedules.year : params.year,
          params.month == null ? schedules.month - 1 : params.month - 1,
          params.day == null ? schedules.day : params.day
        );
        time_end.setHours(
          params.end_hour == null ? schedules.end_hour : params.end_hour,
          params.end_minute == null ? schedules.end_minute : params.end_minute,
          0
        );
        schedules
          .update({
            start_hour:
              params.start_hour == null
                ? schedules.start_hour
                : params.start_hour,
            end_hour:
              params.end_hour == null ? schedules.end_hour : params.end_hour,
            lesson_id:
              params.lesson_id == null ? schedules.lesson_id : params.lesson_id,
            start_minute:
              params.start_minute == null
                ? schedules.start_minute
                : params.start_minute,
            end_minute:
              params.end_minute == null
                ? schedules.end_minute
                : params.end_minute,
            team_name:
              params.team_name == null ? schedules.team_name : params.team_name,
            day: params.day == null ? schedules.day : params.day,
            month: params.month == null ? schedules.month : params.month,
            year: params.year == null ? schedules.year : params.year,
            time_start: time_start,
            time_end: time_end,
            lesson_name:
              params.lesson_name == null
                ? schedules.lesson_name
                : params.lesson_name
          })
          .then(success => {
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
  }
};

// get schedule record and pagination (3 weeks before current time)
exports.getScheduleForRecord = (req, res, next) => {
  console.log('Getting Schedule for Record');
  // check user
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
  if (req.params.page_num < 1 || req.params.page_num > 3) {
    return res.jsonp(
      new ReturnResult('Error', null, null, Constants.messages.REPLY_NOT_FOUND)
    );
  }
  // set the range of the time
  var before_time = new Date();
  var after_time = new Date();
  before_time.setDate(before_time.getDate() - 7 * (req.params.page_num - 1));
  after_time.setFullYear(
    before_time.getFullYear(),
    before_time.getMonth(),
    before_time.getDate() - 7 * req.params.page_num
  );
  // convert to UTC timezone to match with mysql
  // Europe/London is GMT equal with UTC
  var before = moment(before_time).tz('Europe/London');
  var after = moment(after_time).tz('Europe/London');
  // set hours to 0
  before.hours(0);
  before.minutes(0);
  before.seconds(0);
  after.hours(0);
  after.minutes(0);
  after.seconds(0);
  before_time = before.format();
  after_time = after.format();
  // find schedule before current time depend on page_num
  const op = sequelize.Op;
  schedule_md
    .findAll({
      where: {
        time_end: { [op.between]: [after_time, before_time] },
        coach_id: req.userData.id
      }
    })
    .then(function(results) {
      return res
        .status(200)
        .jsonp(
          new ReturnResult(null, results, 'Get Schedule for Record.', null)
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

// get schedule at current time as default
exports.getDefaultSchedule = (req, res, next) => {
  console.log('Getting Default Schedule');
  // check user
  if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
  // set time
  var current_time = new Date();
  var hour = current_time.getHours();
  var minute = current_time.getMinutes();
  var current_hour = hour + minute / 60;
  var day = current_time.getDate();
  var month = current_time.getMonth() + 1;
  var year = current_time.getFullYear();
  // select all schedule in current day and order increasing
  schedule_md
    .findAll({
      where: { day: day, month: month, year: year },
      order: [['time_end', 'ASC']]
    })
    .then(function(results) {
      // this use to compare current_hour with the time between 2 schedule
      // if it's not between the time start and end of a schedule
      // define var time of the end of a schedule
      var end_before = 0;
      // define var time of the start of a next schedule
      var start_after = 0;
      var result;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var start_time = result.start_hour + result.start_minute / 60;
        var end_time = result.end_hour + result.end_minute / 60;
        // if current_hour inside a schedule
        if (current_hour >= start_time && current_hour <= end_time) {
          break;
        } else {
          // if it is the last schedule in the day
          if (i == results.length - 1) {
            break;
          }
          // time of the end of a schedule
          end_before = end_time;
          // time of the start of a next schedule
          start_after =
            results[i + 1].start_hour + results[i + 1].start_minute / 60;
          // if current_hour is inside the time between 2 schedule, get the previous schedule
          if (current_hour > end_before && current_hour < start_after) {
            break;
          }
        }
      }
      lesson_md
        .findOne({ where: { id: result.lesson_id } })
        .then(function(lesson) {
          return res.jsonp(
            new ReturnResult(lesson, null, 'Get Default Lesson.', null)
          );
        });
    })
    .catch(function(err) {
      return res.jsonp(
        new ReturnResult(
          err.message,
          null,
          null,
          Constants.messages.UNEXPECTED_ERROR
        )
      );
    });
};

exports.getScheduleByID = function(req, res, next) {
  if (!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID) {
    return res.jsonp(
      new ReturnResult(
        'Error',
        null,
        null,
        Constants.messages.UNAUTHORIZED_USER
      )
    );
  }
  schedule_md
    .findOne({
      where: { id: req.params.schedule_id }
    })
    .then(function(result) {
      if (result == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.SCHEDULE_ID_INVALID
          )
        );
        return;
      }
      return res.jsonp(
        new ReturnResult(result, null, 'Get schedule by ID successful.', null)
      );
    })
    .catch(function(err) {
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.CAN_NOT_GET_SCHEDULE
        )
      );
    });
};
// exports.getScheduleByDate = function(req, res, next){
//   if(!req.userData || req.userData.role_id == Constants.ROLE_TRAINEE_ID){
//     return  res.jsonp(new ReturnResult('Error', null ,null, Constant.message.UNAUTHORIZED_USER));
//   }
//   schedule_md.findOne({where:{}})
// }

// get lesson by date
exports.getLessonByDate = function(req, res, next) {
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
  schedule_md
    .findAll({
      attributes: ['lesson_id'],
      where: { day: req.body.day, month: req.body.month, year: req.body.year }
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult('Error', null, null, Constants.messages.INVALID_DATE)
        );
        return;
      }
      // found it and push lesson_id to list
      var list = [];
      Object.keys(result).forEach(function(key) {
        list.push(result[key].lesson_id); // push
      });
      // find lesson information by list lesson_id
      lesson_md.findAll({ where: { id: list } }).then(function(results) {
        //return result
        return res.jsonp(
          new ReturnResult(
            null,
            results,
            'Get lesson by date successful.',
            null
          )
        );
      });
    })
    .catch(function(err) {
      //catch err
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
//get schdule by date
exports.getScheduleByDateLesson = function(req, res, next) {
  console.log('Get Schedule By Date and Lesson');
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
  // Select lesson exercises by date and lesson_id
  schedule_md
    .findAll({
      where: {
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        lesson_id: req.body.lesson_id
      }
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult('Error', null, null, Constants.messages.INVALID_DATE)
        );
        return;
      }
      // found it return result
      return res.jsonp(
        new ReturnResult(null, result, 'Get schedule by date successful.', null)
      );
    })
    .catch(function(err) {
      //catch err
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

// get lesson by date and coach
exports.getLessonByDateCoach = function(req, res, next) {
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
  schedule_md
    .findAll({
      attributes: ['lesson_id'],
      where: {
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        coach_id: req.userData.id
      }
    })
    .then(function(result) {
      // check result if it existing or not
      if (result.length == 0) {
        // not found
        res.jsonp(
          new ReturnResult('Error', null, null, Constants.messages.INVALID_DATE)
        );
        return;
      }

      // found it and push lesson_id to list
      var list = [];
      Object.keys(result).forEach(function(key) {
        list.push(result[key].lesson_id); // push
      });
      // find lesson information by list lesson_id
      lesson_md.findAll({ where: { id: list } }).then(function(results) {
        //return result
        return res.jsonp(
          new ReturnResult(
            null,
            results,
            'Get lesson by date and coach successful.',
            null
          )
        );
      });
    })
    .catch(function(err) {
      //catch err
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
