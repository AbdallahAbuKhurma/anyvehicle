'use strict';

const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  carBrand: { type: String, required: true },
  carModel: { type: Number, required: true },
  powerUnit: {type: String, required: true, enum: ['petrol', 'diesel', 'electric', 'hybrid']},
  description: {type: String, required: true},
});

const ServiceModel = mongoose.model('service', serviceSchema);

module.exports = {
  ServiceModel,
  serviceSchema,
};
