'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Email Schema
 */
var EmailSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String,
    default: '',
    trim: true,
    required: 'Email name cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  }
});

mongoose.model('Email', EmailSchema);
