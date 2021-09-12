'use strict';

const Users = require('../models/users');

module.exports = async (req, res, next) => {
  const _authError = () => {
    next('Invalid Login');
  };

  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    let token = req.headers.authorization.split(' ').pop();
    let validUser = await Users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (error) {
    _authError();
  }
};
