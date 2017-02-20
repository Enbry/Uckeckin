'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Signal Schema
 */
var SignalSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  signalID: {
    type: Number
  },
  signalCode: {
    type: String,
    trim: true,
  },
  signalLicenses: {
    type: Schema.ObjectId,
    ref: 'License',
  },
  signalBeacons: {
    type: Schema.ObjectId,
    ref: 'Beacon'
  },
  signalStatus: {
    type: String,
    default: 'Inactif'
  },
  signalSounds: [
    {
      channel1: String,
      channel2: String,
      channel3: String
    }
  ],
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  }
});

mongoose.model('Signal', SignalSchema);
