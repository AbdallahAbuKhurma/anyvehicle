'use strict';

const express = require('express');
const serviceRoutes = express.Router();
const serviceContorller = require('../controllers/service-controller');

serviceRoutes.get('/service', serviceContorller.getAllServices);
serviceRoutes.get('/service/:id', serviceContorller.getUserServices);
serviceRoutes.post('/service/:id', serviceContorller.createService);
serviceRoutes.put('/service/:id', serviceContorller.updateService);
serviceRoutes.delete('/service/:id', serviceContorller.deleteService);

module.exports = serviceRoutes;
