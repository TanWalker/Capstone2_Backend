exports.deleteLessonExerciseByLessonID = function(req, res, next) {
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
    // check if lesson excercise id is exist or not.
    lessonExercise_md
      .findAll({
  
        where: { lesson_id: params.lesson_id }
      })
      .then(function(result) {
        console.log(result);
        // check result if it existing or not
        if (result.length == 0) {
          // not found
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
        // found it and push lesson_id to list
        var list = [];
        Object.keys(result).forEach(function(key) {
          list.push(result[key].lesson_id); // push
        });
        // find lesson exercise information by list lesson_id
        console.log(list);
        lessonExercise_md
          .destroy({ where: { lesson_id: list }})
          .then(function(results) {
            //return result
            return res.jsonp(
              new ReturnResult(null, results, 'Delete successful.', null)
            );
          });
      })
      .catch(function(err) {
        //catch err
        return res.jsonp(
          new ReturnResult(
            err.message,
            null,
            null,
            Constants.messages.INVALID_INFORMATION
          )
        );
      });
  };