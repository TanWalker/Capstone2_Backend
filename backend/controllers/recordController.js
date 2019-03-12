const ReturnResult = require('../libs/ReturnResult');
const record_md = require('../models/record');
const Constants = require('../libs/Constants');

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
exports.addRecord = function(req, res, next) {
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
    // Insert Record info to database //
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
      date_id: params.date_id
    });
    result
      .then(function(record) {
        // console.log(Record);
        //add the created Record for return
        res
          .status(200)
          .jsonp(new ReturnResult(record, null, 'Record Created', null));
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
