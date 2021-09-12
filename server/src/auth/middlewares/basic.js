'use strict';

const base64 = require('base-64');
const Users = require('../models/users');

module.exports = async (req, res, next) => {
  const _authError = () => {
    res.status(403).send('Invalid Login');
  };

  try {
    if (!req.headers.authorization) {
      return _authError();
    }

    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');

    req.user = await Users.authenticateBasic(user, pass);
    next();
  } catch (error) {
    _authError();
  }
};
