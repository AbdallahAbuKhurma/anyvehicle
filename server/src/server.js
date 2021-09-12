'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const uuid = require('uuid').v4;
const io = socketio(server, {
  cors: {
    origin: '*',
    // origin: 'http://localhost:3000',
  },
});

const logger = require('./middlewares/logger');
const errorHandler = require('./error-handlers/500');
const notFoundHandler = require('./error-handlers/404');
const authRoutes = require('./auth/routes');
const serviceRoutes = require('./routes/service.routes');


app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(serviceRoutes);

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

/*==================================Socket.io=========================================*/
const staffRoom = 'staff';

io.on('connection', (socket) => {
  socket.on('join', (payload) => {
    // socket.join will put the socket in a private room
    socket.join(staffRoom);
    socket.to(staffRoom).emit('onlineStaff', { name: payload.name, id: socket.id });
  });
  socket.on('createTicket', (payload) => {
    // 2
    socket
      .in(staffRoom)
      .emit('newTicket', { ...payload, id: uuid(), socketId: socket.id });
  });

  socket.on('claim', (payload) => {
    // when a TA claim the ticket we need to notify the student
    socket.to(payload.studentId).emit('claimed', { name: payload.name });
  });
  socket.on('disconnect', () => {
    socket.to(staffRoom).emit('offlineStaff', { id: socket.id });
  });
});
/*==================================Socket.io=========================================*/

const start = (port) => {
  if(!port) {throw new Error('There is no port');}
  server.listen(port, () => {
    console.log(`server is working on ${port}`);
  });
};

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: start,
};
