'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
Area = mongoose.model('Area'),
Zone = mongoose.model('Zone'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a place
*/
exports.create = function (req, res) {
  var area = new Area(req.body);
  area.user = req.user;
  area.zones = req.body.zones;


  /*if(req.body.zones._id !== null){
    area.zones = req.body.zones;
  }*/

  if (area.zones){
    area.placeStatus = 'Actif';
  } else {
    area.placeStatus = 'Inactif';
  }

  area.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //area.zones.push(zones);
      res.json(area);
    }
  });
};

/**
* Show the current place
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var area = req.area ? req.area.toJSON() : {};

  // Determine if the current user is the owner
  area.isCurrentUserOwner = !!(req.user && area.user && area.user._id.toString() === req.user._id.toString());

  res.json(area);
};

/**
* Update a place
*/
exports.update = function (req, res) {
  var area = req.area;

  area.placeName = req.body.placeName;
  area.placeDesc = req.body.placeDesc;
  area.placeTags = req.body.placeTags;
  area.placeAddress = req.body.placeAddress;
  area.placeZipCode = req.body.placeZipCode;
  area.placeTown = req.body.placeTown;
  area.placeCountry = req.body.placeCountry;

  if(req.body.zones._id !== null){
    area.zones = req.body.zones;
  }

  area.formatted_address = req.body.formatted_address;
  area.placeLat = req.body.placeLat;
  area.placeLng = req.body.placeLng;

  if (area.zones){
    area.placeStatus = 'Actif';
  } else {
    area.placeStatus = 'Inactif';
  }

  area.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(area);
    }
  });
};

/**
* Delete a place
*/
exports.delete = function (req, res) {
  var area = req.area;

  area.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(area);
    }
  });
};

/**
* List of Places
*/
exports.list = function (req, res) {

  Area.find().sort('-created').populate('user', 'displayName').populate('zones', 'zoneName').exec(function (err, areas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(areas);
    }
  });
};

/**
* Place middleware
*/
exports.areaByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Area is invalid'
    });
  }

  Area.findById(id).populate('user', 'displayName').populate('zones', 'zoneName').exec(function (err, area) {
    if (err) {
      return next(err);
    } else if (!area) {
      return res.status(404).send({
        message: 'No area with that identifier has been found'
      });
    }
    req.area = area;
    next();
  });
};
