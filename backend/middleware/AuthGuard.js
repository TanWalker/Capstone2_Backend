const jwt = require("jsonwebtoken"),
const Constants = require('../libs/Constants');

module.exports = (req, res, next) => {
    var token = req.headers['authorization'];
    if (!token) 
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token,dgj1qgh21j125125k1hj25j125ghj21g4j1h2g51j5g6b09u8, (err, decoded) => {

      // check for error
      if (!err) {

        // get expired date
        var dateNow = parseInt(new Date().getTime() / 1000);
        var expiryDate = +decoded.iat + (Constants.EXPIRES * 60 * 60);

        // check expiration
        if (dateNow < expiryDate) {

          // set user
          req.user = decoded;

        }
      } else {
        console.log("Error in auth guard: ");
        console.log(err);
      }

      // keep moving
      next();
    });
}