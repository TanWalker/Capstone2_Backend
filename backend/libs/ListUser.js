const user_md = require("../models/user");
const bcrypt = require("bcrypt");
var q = require("q");
class ListUser {
  constructor(num) {
    var defer = q.defer();
    var list={};
    for (var i = 0; i < num; i++) {
      bcrypt.hash("123456", 10).then(function(password) {
        //Insert user to database
        list[i] = [];
        list[i].push('username: "akg",email: "",password: password,first_name: "",last_name: "params.lastname",phone_num: "",role_id: 3');
        var user = user_md.create({
          username: "akg",
          email: "",
          password: password,
          first_name: "",
          last_name: "params.lastname",
          phone_num: "",
          role_id: 3
        });
        
        
      });
    }
    var z = JSON.stringify(list);
    console.log(z);
    defer.resolve(list);
    return defer.promise;
  }
}

module.exports = ListUser;
