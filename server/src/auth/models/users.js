'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const serviceSchema = require('../../models/service-schema').serviceSchema;

const users = new mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default: 'user', enum: ['user', 'admin']},
  services: [serviceSchema],
}, {
  toJSON: {
    virtuals: true,
  },
});

users.virtual('token').get(function() {
  let tokenObject = {
    userName: this.userName,
    email: this.email,
    role: this.role,
  };
  return jwt.sign(tokenObject, SECRET);
});

users.virtual('capabilities').get(function() {
  let acl = {
    user: ['read'],
    admin: ['read', 'create', 'update', 'delete'],
  };
  return acl[this.role];
});

users.pre('save', async function() {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

users.statics.authenticateBasic = async function(email, password) {
  try {
    const user = await this.findOne({ email });
    const valid = await bcrypt.compare(password, user.password);
    if(valid) {
      return user;
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    throw new Error(error);
  }
};

users.statics.authenticateWithToken = async function(token) {
  try {
    const parsedToken = jwt.verify(token, SECRET);
    const user = this.findOne({ email: parsedToken.email });
    if(user) {
      return user;
    } else {
      throw new Error('User Not Found');
    }
  } catch (error) {
    throw new Error(error);
  }
};

const UsersModel = mongoose.model('users', users);

module.exports = UsersModel;
