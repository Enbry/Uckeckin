'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Stat Schema
 */
var StatSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  logID: {
    type: Number,
  },
  bundleIdentifier: {
    type: String,
    trim: true
  },
  logPlatform: {
    type: String,
    trim: true,
  },
  logModel: {
    type: String,
    trim: true,
  },
  logVersion: {
    type: String,
    trim: true,
  },
  logChannel: {
    type: String,
    trim: true,
  },
  license: {
    type: Schema.ObjectId,
    ref: 'License',
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  }
});

mongoose.model('Stat', StatSchema);
