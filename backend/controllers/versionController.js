const pkginfo = require('pkginfo')(module);

exports.getVersion = function(req, res) {
  console.log('get version');
  res.json({
    name: module.exports.name,
    version: module.exports.version,
    environment: process.env.NODE_ENV || 'DEVELOPMENT',
    t: -1
  });
};
