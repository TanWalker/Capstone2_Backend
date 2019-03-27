const autoController = require('../controllers/autoController');
const express = require('express');
const router = express.Router();
const common = require('../common/common');
const ReturnResult = require('../libs/ReturnResult');
const Constants = require('../libs/Constants');
const testController = require('../controllers/testController');


router.get('/api/testGetRecordForAutoTool', function(req, res, next) {

    var query = 'CALL `auto_tool_report_proc`( ? , ? , ? );'
    var month = 3;
    var year = 2019;
    var user_id =58;
  
    common.exec_Procedure(query, [month, year ,user_id]).then(
      function(results) {
        console.log(results);
        return  res.jsonp(
          new ReturnResult(
           null,
           results,
           Constants.messages.EXCUTED_PROCEDURE,
           null
         )
       );
      }
    ).catch((err) => setImmediate(() => { throw err; }));
  });

router.get('/api/testAutoInsertRecordMonthly' , function(req,res,next) {

    var query = 'CALL `auto_insert_monthly_report_proc`( ? , ? , ? );'
    var month = 3;
    var year = 2019;
    var user_id =58;
  
    common.exec_Procedure(query, [month, year ,user_id]).then(
      function(results) {
        console.log(results);
        return  res.jsonp(
          new ReturnResult(
           null,
           results,
           Constants.messages.EXCUTED_PROCEDURE,
           null
         )
       );
      }
    ).catch((err) => setImmediate(() => { throw err; }));
  });


  router.get('/api/miband' ,  testController.testMiband);

  router.get('/api/testMiband' , function(req, res) {
    res.render('index');
  });
module.exports = router;
