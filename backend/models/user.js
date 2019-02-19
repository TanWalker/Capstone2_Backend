var db = require("../common/database");
var q = require("q");

var conn = db.getConnection();

//add user to db
function addUser(user) {
  if (user) {
    var defer = q.defer();
    var query = conn.query("INSERT INTO user SET ?", user, function(
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

//get user by email
function getUserByEmail(email){
  if(email){
    var defer = q.defer();
    var query = conn.query("SELECT * FROM user WHERE ?", {email:email}, function(
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

//Select all users
function getAllUsers(){
  var defer = q.defer();
  var query = conn.query("SELECT * FROM user", function(err, users) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(users);
    }
  });
  return defer.promise;
}


module.exports ={
    addUser:addUser,
    getUserByEmail:getUserByEmail,
    getAllUsers:getAllUsers
};
