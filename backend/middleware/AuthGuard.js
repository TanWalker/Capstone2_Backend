const jwt = require('jsonwebtoken');
const Constants = require('../libs/Constants');
const config = require('config');
const ReturnResult = require('../libs/ReturnResult');

module.exports = (req, res, next) => {
  try {
    //const token = req.headers.authorization;
    // const token = req.headers.authorization.split(' ')[1];
    var token = req.headers['authorization'];
    const decodedToken = jwt.verify(token, config.get('token_key'));
    req.userData = {
      id: decodedToken.id,
      role_id: decodedToken.role_id,
      username: decodedToken.username,
      first_name: decodedToken.first_name,
      last_name: decodedToken.last_name,
      dob: decodedToken.dob,
      phone: decodedToken.phone,
      email: decodedToken.email,
      address: decodedToken.address,
      parent_name: decodedToken.parent_name,
      parent_phone: decodedToken.parent_phone,
      gender: decodedToken.gender,
      is_verified: decodedToken.is_verified,
      age: decodedToken.age,
      height: decodedToken.height,
      weight: decodedToken.weight,
      avatar: decodedToken.avatar,
      slug: decodedToken.slug
    };
    next();
  } catch (error) {
    res.json(
      new ReturnResult('Error', null, null, Constants.messages.NO_TOKEN_FOUND)
    );
  }
};
