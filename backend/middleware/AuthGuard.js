const jwt = require('jsonwebtoken');
const Constants = require('../libs/Constants');
const config = require('config');

module.exports = (req, res, next) => {
  var token = req.headers['authorization'];
  if (!token)
    return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.get('token_key'), (err, decoded) => {
    // check for error
    if (!err) {
      // get expired date
      var dateNow = parseInt(new Date().getTime() / 1000);
      var expiryDate = +decoded.iat + Constants.EXPIRES * 60 * 60;

      // check expiration
      if (dateNow < expiryDate) {
        // set user
        req.user = decoded;
      }
    } else {
      console.log('Error in auth guard: ');
      console.log(err);
    }

    // keep moving
    next();
  });
};
