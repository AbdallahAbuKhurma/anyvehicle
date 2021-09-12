'use strict';

module.exports = (error, req, res, next) => {
  const err = error.massege? error.message : error;
  res.status(500).json({err});
};
