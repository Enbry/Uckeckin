'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Beacon Schema
 */
var BeaconSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  beaconName: {
    type: String,
    default: '',
    trim: true,
  },
  cmdNb: {
    type: String,
    trim: true,
  },
  recDate: {
    type: Date,
  },
  beaconPrice: {
    type: Schema.ObjectId,
    ref: 'BeaconPrice'
  },
  currency: {
    type: String,
    default: 'EUR'
  },
  firmware_v: {
    type: String,
    trim: true,
  },
  hardware_v: {
    type: String,
    trim: true,
  },
  beaconType: {
    type: String,
    trim: true,
  },
  beaconStatus: {
    type: String,
    trim: true,
    default: 'Commandé',
  },
  beaconSignals: {
    type: Schema.ObjectId,
    ref: 'Signal',
  },
  beaconLicense: {
    type: Schema.ObjectId,
    ref: 'License'
  },
  beaconQty: {
    type: Number
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  beaconTotalOrder: {
    type: Number,
    }
});

mongoose.model('Beacon', BeaconSchema);
