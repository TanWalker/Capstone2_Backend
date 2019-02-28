const user_md = require("../models/user");

class ListUser {
  constructor(num, id) {
    var list = {};
    var k= find_last();
      console.log(k);
      for (var i = 0; i < num; i++) {
        k++;
        var user = {
          username: "akg_" + k + "",
          email: "",
          password:
            "$2b$10$cwB2qTEL1EEm7wQav9f5nePM7RXdJQ6aKXVyqEAcbBJUwP.LDH4Jq",
          first_name: "",
          last_name: "params.lastname",
          phone_num: "",
          role_id: 3
        };
        user = JSON.stringify(user);
        list[i] = {};
        list[i] = user;
      }
      var result = [];
      Object.keys(list).forEach(function(key) {
        // console.log('Key : ' + key + ', Value : ' + list[key]);

        var obj = JSON.parse(list[key]);
        result.push({
          info: obj
        });
        user_md
          .create({
            username: obj.username,
            email: "",
            password:
              "$2b$10$cwB2qTEL1EEm7wQav9f5nePM7RXdJQ6aKXVyqEAcbBJUwP.LDH4Jq",
            first_name: "",
            last_name: "",
            phone_num: "",
            role_id: 3
          })
          .catch(function(err) {
            result.push({
              user: user
            });
          });
      });

      // console.log(result);
      var promise = new Promise(function(resolve, reject) {
        /* missing implementation */
        // console.log(result);
        resolve(result);
      });
      // console.log(promise);
      return promise;
  }
}
function find_last(){
  user_md
      .findAll({
        
        limit: 1,
        where: {},
        order: [["id", "DESC"]]
      }).then(function(record){
        console.log(record);
        
        return Promise.resolve(record.id);
      });
}
module.exports = ListUser;
