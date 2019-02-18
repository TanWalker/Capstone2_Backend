const express = require('express');
const bodyParser = require('body-parser');
const example_md=require('../models/example');

const router = express.Router();

// example shoot JSON to frontend
router.get('', (req, res, next) => {
  var data = example_md.getAllPosts();
  data.then(function(posts){
    var data={
        posts:posts
    };
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: posts
      });
  }).catch(function(err){
    res.status(500).json({
        message: 'Posts fetched failed!'
      });
  });
  
});

// example get json from frontend
router.post('', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post receive'
  });
});

module.exports = router;
