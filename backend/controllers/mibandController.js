const ReturnResult = require('../libs/ReturnResult');
const Constants = require('../libs/Constants');
const record_md = require('../models/record');

exports.getHeartRate = function(req, res, next) {
  console.log('Get heart rate');
  record_md
    .findOne({
      where: {
        user_id: req.params.user_id,
        coach_id: req.params.coach_id,
        schedule_id: req.params.schedule_id,
        exercise_id: req.params.exercise_id
      }
    })
    .then(function(result) {
      if (result != null) {
        result
          .update({
            heart_rate: req.body.heart_rate
          })
          .then(function() {
            console.log('Update heart rate success.');
            res.render('index', { data: 'Update heart rate success.' });
          })
          .catch(function(err) {
            console.log(Constants.messages.UNEXPECTED_ERROR);
            res.render('index', { data: Constants.messages.UNEXPECTED_ERROR });
          });
      } else {
        record_md
          .create({
            user_id: req.params.user_id,
            coach_id: req.params.coach_id,
            schedule_id: req.params.schedule_id,
            exercise_id: req.params.exercise_id,
            heart_rate: req.body.heart_rate
          })
          .then(function() {
            console.log('Insert heart rate success.');
            res.render('index', { data: 'Insert heart rate success.' });
          })
          .catch(function(err) {
            console.log(Constants.messages.UNEXPECTED_ERROR);
            res.render('index', { data: Constants.messages.UNEXPECTED_ERROR });
          });
      }
    })
    .catch(function(err) {
      res.render('index', { data: Constants.messages.UNEXPECTED_ERROR });
    });
};
