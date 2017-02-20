'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Beacon Price Schema
 */
var BeaconPriceSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  beaconQty: {
    type: Number,
  },
  /*beaconQty: {
    type: Number,
  },*/
  beaconPrice: {
    type: Number,
  },
  beaconTotalPrice: {
    type: Number
  }
});

mongoose.model('BeaconPrice', BeaconPriceSchema);
