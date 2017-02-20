'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
Zone = mongoose.model('Zone'),
Area = mongoose.model('Area'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a zone
*/
exports.create = function (req, res) {
  var zone = new Zone(req.body);
//  var user = req.user;
  zone.user = req.user;
  zone.places = req.body.places;
  //zone.user.hasZone = true;

  if (zone.places){
    zone.zoneStatus = 'Actif';
  } else {
    zone.zoneStatus = 'Inactif';
  }

  zone.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(zone);
    }
  });
};

/**
* Show the current zone
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var zone = req.zone ? req.zone.toJSON() : {};

  zone.isCurrentUserOwner = !!(req.user && zone.user && zone.user._id.toString() === req.user._id.toString());

  res.json(zone);
};

/**
* Update a zone
*/
exports.update = function (req, res) {
  var zone = req.zone;

  zone.zoneName = req.body.zoneName;
  zone.zoneTags = req.body.zoneTags;

  zone.places = req.body.places;

  if (zone.places){
    zone.zoneStatus = 'Actif';
  } else {
    zone.zoneStatus = 'Inactif';
  }

  zone.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(zone);
    }
  });
};

/**
* Delete a zone
*/
exports.delete = function (req, res) {
  var zone = req.zone;

  zone.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(zone);
    }
  });
};

/**
* List of zones
*/
exports.list = function (req, res) {
  Zone.find().sort('-created').populate('user', 'displayName hasZone').populate('places', 'placeName').exec(function (err, zones) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(zones);
    }
  });
};

/**
* Zone middleware
*/
exports.zoneByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Zone is invalid'
    });
  }

  Zone.findById(id).populate('user', 'displayName hasZone').populate('places', 'placeName').exec(function (err, zone) {
    if (err) {
      return next(err);
    } else if (!zone) {
      return res.status(404).send({
        message: 'No zone with that identifier has been found'
      });
    }
    req.zone = zone;
    next();
  });
};
