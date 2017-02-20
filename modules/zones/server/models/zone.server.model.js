'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Zone Schema
 */
var ZoneSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  zoneName: {
    type: String,
    default: 'Zone non définie',
    trim: true,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  places: {
    type: Schema.ObjectId,
    ref: 'Area'
  },
  zoneTags: {
    type: String,
    trim: true
  },
  zoneStatus: {
    type: String,
    default: 'Désactivé'
  }
});

mongoose.model('Zone', ZoneSchema);
