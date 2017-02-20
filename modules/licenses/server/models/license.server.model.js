'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * License Schema
 */
var LicenseSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  licenseName: {
    type: String,
    default: '',
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  licenseType: {
    type: String,
    trim: true,
  },
  licenseSignals: {
    type: Schema.ObjectId,
    ref: 'Signal'
  },
  licenseAreas: {
    type: Schema.ObjectId,
    ref: 'Area',
  },
  licenseZones: {
    type: Schema.ObjectId,
    ref: 'Zone',
  },
  licenseBeacons: {
    type: Schema.ObjectId,
    ref: 'Beacon',
  },
  licenseStatus: {
    type: String,
    default: 'Désactivée'
  }
});

mongoose.model('License', LicenseSchema);
