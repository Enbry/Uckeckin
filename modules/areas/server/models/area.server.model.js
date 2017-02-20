'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Place Schema
 */
var AreaSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  placeName: {
    type: String,
    default: '',
    trim: true,
    required: 'Place title cannot be blank'
  },
  placeDesc: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  zones: {
    type: Schema.ObjectId,
    ref: 'Zone',
    //default: null
  },
  placeTags: {
    type: String,
    trim: true
  },
  formatted_address: {
    type: String,
    trim: true
  },
  placeLat: {
    type: Number,
    default: 48.87
  },
  placeLng: {
    type: Number,
    default: 2.33
  },
  placeStatus: {
    type: String,
    default: 'Désactivé'
  }
});

mongoose.model('Area', AreaSchema);
