'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * License Price Schema
 */
var LicensePriceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  licenseQty: {
    type: Number,
  },
  licensePrice: {
    type: Number,
  },
  licenseRed1: {
    type: Number,
  },
  licenseRed3: {
    type: Number,
  },
  licenseRed6: {
    type: Number,
  },
  licenseRed12: {
    type: Number,
  }
});

mongoose.model('LicensePrice', LicensePriceSchema);
