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
    date_id: params.date_id
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
