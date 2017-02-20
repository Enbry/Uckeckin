'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * Gain Schema
 */
var GainSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  gainID: {
    type: Number
  },
  gainName: {
    type: String,
    trim: true,
    required: 'Content title cannot be blank'
  },
  gainDesc: {
    type: String,
    trim: true,
  },
  gainSignal: {
    type: Schema.ObjectId,
    ref: 'Signal',
  },
  gainFq: {
    type: Number,
    default: 0
  },
  gainQuota: {
    type: Number,
  },
  gainImageURL: {
    type: String,
    default: 'modules/gains/client/img/icons/default.png',
    trim: true
  },
  gainIcon: {
    type: String,
    default: 'modules/gains/client/img/icons/default.png'
  },
  gainContent: {
    type: String
  },
  gainStartDate: {
    type: Date,
  },
  gainEndDate: {
    type: Date,
  },
  gainDefaultContent: {
    type: Boolean,
    default: false,
  },
  gainUCheckinDisplay: {
    type: Boolean,
    default: true,
  },
  gainMaxDisplay: {
    type: Number,
    default: -1
  },
  gainDisplayDelay: {
    type: Number,
    default: 10
  },
  gainPriority: {
    type: Number,
    default: 0
  },
  gainDistinctDisplayDelay: {
    type: Number,
    default: 60
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  }
});

mongoose.model('Gain', GainSchema);
