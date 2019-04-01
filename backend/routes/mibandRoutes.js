const express = require("express");
const router = express.Router();
const mibandController = require("../controllers/mibandController");
const authCheck = require("../middleware/AuthGuard");

// signin route
router.get("/api/miband",function(req,res,next){
    res.render('index');
});

module.exports = router;
