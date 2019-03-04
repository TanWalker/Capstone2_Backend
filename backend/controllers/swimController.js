const ReturnResult = require('../libs/ReturnResult');
const swim_style = require('../models/swim');
const Constants = require('../libs/Constants');


// this function is used to test ( get all team )
exports.getSwimStyle = function (req, res ,next) {

  console.log("Getting all style swim");
      // find all team 
      swim_style.findAll().then(function(styles) {

         // get result
         var result = new ReturnResult(null, styles, "All styles", null);
  
         // return
         res.jsonp(result);
      })

};