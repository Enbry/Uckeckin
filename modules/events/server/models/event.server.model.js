'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Event Schema
 */
var EvtSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now
  },
  eventID: {
    type: Number
  },
  eventName: {
    type: String,
    trim: true,
    required: 'Content title cannot be blank'
  },
  eventShortDesc: {
    type: String,
    trim: true,
  },
  eventLongDesc: {
    type: String,
    trim: true,
  },
  eventSignal: {
    type: Schema.ObjectId,
    ref: 'Signal',
  },
  eventPicture: {
    type: String,
    default: ''
  },
  eventIcon: {
    type: String,
    default: ''
  },
  eventContent: {
    type: String,
  },
  eventStartDate: {
    type: Date
  },
  eventEndDate: {
    type: Date,
  },
  eventPublishStartDate: {
    type: Date,
  },
  eventPublishEndDate: {
    type: Date,
  },
  eventLat: {
    type: Number,
    default: 48.87
  },
  eventLng: {
    type: Number,
    default: 2.33
  },
  eventPrivacy: {
    type: Boolean,
    default: false
  },
  formatted_address: {
    type: String,
    trim: true
  }
});

mongoose.model('Evt', EvtSchema);
