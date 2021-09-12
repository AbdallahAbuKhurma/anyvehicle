'use strict';

const express = require('express');
const authRoutes = express.Router();

const User = require('./models/users');
const basicAuth = require('./middlewares/basic');
const bearerAurh = require('./middlewares/bearer');
const permissions = require('./middlewares/acl');

authRoutes.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (error) {
    next(error.message);
  }
});

authRoutes.post('/signin', basicAuth, async (req, res, next) => {
  try {
    const user = {
      user: req.user,
      token: req.user.token,
    };
    res.status(200).json(user);
  } catch (error) {
    next(error.message);
  }
});

authRoutes.get('/users', bearerAurh, permissions('delete') ,async (req, res, next) => {
  try {
    const users = await User.find({});
    const list = users.map(user => user.email);
    res.status(200).json(list);
  } catch (error) {
    next(error.message);
  }
});

module.exports = authRoutes;