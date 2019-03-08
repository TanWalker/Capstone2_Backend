const ReturnResult = require('../libs/ReturnResult');
const distance_md = require('../models/distance');
const Constants = require('../libs/Constants');

// this function is used to test ( get all Distance )
exports.getDistance = function(req, res, next) {
  console.log('Getting all Distance');

  // find all Distance
  distance_md.findAll().then(function(distances) {
    // get result
    return res.jsonp(
      new ReturnResult(null, distances, 'Get all distances successful.', null)
    );
  });
};

// this function is delete Distance
exports.deleteDistance = function(req, res, next) {
  console.log('Deleting Distance');

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
  // var id = req.body.id;
  // find all Distance
  var id = req.params.distance_id;
  distance_md
    .findOne({ where: { id: id } })
    .then(function(Distances) {
      // delete Distances
      if (Distances == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.DISTANCE_ID_INVALID
          )
        );
        return;
      }
      Distances.destroy();
      // get result
      var result = new ReturnResult(
        null,
        null,
        'Delete Distance successfully',
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
// Add swim Distance
exports.addDistance = (req, res, next) => {
  // check authorization if user is admin or coach
  if (req.userData.role_id != 3) {
    const params = req.body;
    var data = distance_md.findOne({
      where: { swim_distance: params.swim_distance }
    });
    //   console.log(req.userData);
    // check whether existing Distance name
    data.then(function(data) {
      if (data) {
        return res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.EXISTING_DISTANCE
          )
        );
      } else {
        // Insert Distance info to database //
        var result = distance_md.create({
          swim_distance: params.swim_distance
        });
        result
          .then(function(distance) {
            //add the created Distance  for return

            res
              .status(200)
              .jsonp(
                new ReturnResult(distance, null, 'Distance Created', null)
              );
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

// this function is update Distance
exports.updateDistance = function(req, res, next) {
  console.log('Updating Distance');

  // check for user is logged in
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
  } else {
    const params = req.body;
    var id = params.id;

    distance_md.findOne({ where: { id: id } }).then(function(distance) {
      if (distance == null) {
        res.jsonp(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.DISTANCE_ID_INVALID
          )
        );
      } else {
        distance
          .update({
            swim_distance:
              params.swim_distance == null
                ? distance.swim_distance
                : params.swim_distance
          })
          .then(success => {
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
  }
};
