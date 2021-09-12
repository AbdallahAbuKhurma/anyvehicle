'use strict';

const server = require('./src/server');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(`${MONGODB_URI}/anyvehicle`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(PORT);
  })
  .catch((err) => {
    console.log('CONECTION ERROR', err.message);
  });
