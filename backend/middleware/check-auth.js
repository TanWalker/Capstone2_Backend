const jwt = require('jsonwebtoken');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();
  } catch (err) {
    res
      .status(401)
      .json(
        new ReturnResult('Error', null, null, Constants.messages.INVALID_TOKEN)
      );
  }
};
