var db = require("../common/database");
var q = require("q");

var conn = db.getConnection();

//Select all record in post
function getAllPosts() {
  var defer = q.defer();
  var query = conn.query("SELECT * FROM posts", function(err, posts) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(posts);
    }
  });
  return defer.promise;
}

//Insert to post
function addPost(params) {
  if (params) {
    var defer = q.defer();
    var query = conn.query("INSERT INTO posts SET ?", params, function(
      err,
      results
    ) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(results);
      }
    });
    return defer.promise;
  }
  return false;
}

//Select selected post
function getPostByID(id){
  if(id){
    var defer = q.defer();
    var query = conn.query("SELECT * FROM posts WHERE ?", {id:id}, function(
      err,
      results
    ) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(results);
      }
    });
    return defer.promise;
  }
  return false;
}

//Delete selected post
function deletePost(id){
  if(id){
    var defer = q.defer();
    var query = conn.query("DELETE FROM posts WHERE id=?", [id], function(
      err,
      results
    ) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(results);
      }
    });
    return defer.promise;
  }
  return false;
}

module.exports = {
  getAllPosts: getAllPosts,
  addPost:addPost,
  getPostByID:getPostByID,
  deletePost:deletePost
};
