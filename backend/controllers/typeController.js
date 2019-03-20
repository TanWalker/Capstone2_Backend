const ReturnResult = require('../libs/ReturnResult');
const type_md = require('../models/type_of_exercise');

// this function is get all type of exercise
exports.getType = function(req, res, next) {
  console.log('Getting all type');
  // find all type
  type_md.findAll().then(function(types) {
    // return result
    return res.jsonp(
      new ReturnResult(null, types, 'Get all types successful.', null)
    );
  });
};

