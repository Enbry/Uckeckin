'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * License Schema
 */
var BillSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users'
  },
  status: {
    type: String,
    default: 'Désactivé'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Bill', BillSchema);
