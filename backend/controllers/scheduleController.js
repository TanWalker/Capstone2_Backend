const ReturnResult = require('../libs/ReturnResult');
const schedule_md = require('../models/schedule');
const Constants = require('../libs/Constants');

// not finish yet.

// this function is used to test ( get all Schedule )
exports.getSchedule = function(req, res, next) {
  console.log('Getting all Schedule');
  // check user
  if (req.userData.role_id == 3 || !req.userData) {
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
  schedule_md.findAll().then(function(schedule) {
    // get result
    var result = new ReturnResult(null, schedule, 'All Schedules', null);

    // return
    res.jsonp(result);
  });
};

// this function is delete Schedule , Eddy will create a trigger to delete all member of this Schedule when we delete Schedule
exports.deleteSchedule = function(req, res, next) {
  console.log('Deleting Schedule');

  // check for user
  if (req.userData.role_id == 3 || !req.userData) {
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
  // check authorization if user is admin or coach
  if (req.userData.role_id == 1 || req.userData.role_id == 2) {
    const params = req.body;
    var data = schedule_md.findOne({
      where: { day: params.day, month: params.month, year: params.year }
    });
    //   console.log(req.userData);
    // check whether existing Schedule name
    data.then(function(data) {
      if (data.start_hour) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXISTING_SCHEDULE
          )
        );
      } else {
        // Insert Schedule info to database //
        var result = schedule_md.create({
          start_hour: params.start_hour,
          end_hour: params.end_hour,
          exercise_id: params.exercise_id,
          coach_id: params.coach_id,
          day: params.day,
          month: params.month,
          year: params.year,
          start_minute: params.start_minute,
          end_minute: params.end_minute
        });
        result
          .then(function(schedule) {
            // console.log(Schedule);
            //add the created Schedule plan for return
            var result = {
              Schedule_plan: schedule
            };
            res
              .status(200)
              .jsonp(new ReturnResult(null, result, 'Schedule Created', null));
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

// this function is update Schedule
exports.updateSchedule = function(req, res, next) {
  console.log('Updating Schedule');

  // check for user is logged in
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
  } else {
    const params = req.body;
    var id = params.id;

    schedule_md.findOne({ where: { id: id } }).then(function(schedules) {
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
            day: params.day == null ? schedules.day : params.day,
            month: params.month == null ? schedules.month : params.month,
            year: params.year == null ? schedules.year : params.year
          })
          .then(success => {
            res
              .status(200)
              .jsonp(
                new ReturnResult(null, success, 'Update successful', null)
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
