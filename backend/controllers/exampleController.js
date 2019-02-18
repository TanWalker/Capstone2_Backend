const bodyParser = require('body-parser');
const example_md = require('../models/example');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');

// example shoot JSON to frontend
exports.example1 = (req, res, next) => {
  var data = example_md.getAllPosts();
  // Use Constants to display message and ReturnResult to to return json
  data
    .then(function(posts) {
      var data = {
        posts: posts
      };
      res
        .status(200)
        .json(new ReturnResult(null, posts, 'Fetched success', null));
    })
    .catch(function(err) {
      res
        .status(500)
        .json(
          new ReturnResult(
            'Error',
            null,
            null,
            Constants.messages.USER_NOT_FOUND
          )
        );
    });
};

// example get json from frontend
exports.example2 = (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post receive'
  });
};
