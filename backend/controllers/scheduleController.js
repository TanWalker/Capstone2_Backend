const ReturnResult = require('../libs/ReturnResult');
const schedule_md = require('../models/schedule');
const Constants = require('../libs/Constants');
const moment = require('moment-timezone');

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
      exercise_id: params.exercise_id,
      coach_id: req.userData.id,
      team_name: params.team_name,
      day: params.day,
      month: params.month,
      year: params.year,
      start_minute: params.start_minute,
      end_minute: params.end_minute,
      time_start: time_start,
      time_end: time_end,
      team_id: params.team_id
    });
    result
      .then(function(schedule) {
        // console.log(Schedule);
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
            exercise_id:
              params.exercise_id == null
                ? schedules.exercise_id
                : params.exercise_id,
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
            time_end: time_end
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

// exports.CopySchedule = function(req, res, next) {
//   console.log('Copy Schedule for a week.');
//   // check user
//   if (req.userData.role_id == Constants.ROLE_TRAINEE_ID || !req.userData) {
//     res.jsonp(
//       new ReturnResult(
//         'Error',
//         null,
//         null,
//         Constants.messages.UNAUTHORIZED_USER
//       )
//     );
//     return;
//   }
//   // define body request
//   const params = req.body;
//   // find all schedule need to copy.
//   schedule_md.findAll({
//     where: {
//       [Op.between]: [{time_start: params.from_start}, {time_start: params.from_end}],
//       [Op.between]: [{time_end: params.from_start}, {time_end: params.from_end}]
//     }
//   });
//   // find all Schedule
//   schedule_md
//     .findAll({ where: { coach_id: req.userData.id } })
//     .then(function(schedules) {
//       Object.keys(schedules).forEach(function(key) {
//         var start = moment(schedules[key].time_start).tz('Asia/Ho_Chi_Minh');
//         var end = moment(schedules[key].time_end).tz('Asia/Ho_Chi_Minh');
//         schedules[key].time_start = start.format();
//         schedules[key].time_end = end.format();
//       });

//       // get result
//       var result = new ReturnResult(null, schedules, 'All Schedules', null);
//       // return
//       return res.jsonp(result);
//     });
// };