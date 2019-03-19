const pkginfo = require('pkginfo')(module);
const version = require('../models/version');
const ReturnResult = require('../libs/ReturnResult');

exports.getVersion = function(req, res) {
  console.log('get version');
  res.json({
    name: module.exports.name,
    version: module.exports.version,
    environment: process.env.NODE_ENV || 'DEVELOPMENT',
    t: -1
  });
};

exports.getAppVersion = function(req, res) {
  console.log('get app version');
 
  version.findOne().then(function(version){
    // get result
    return res.jsonp(
      new ReturnResult(version, null, 'Get version of app successful.', null)
    );
  });
}
