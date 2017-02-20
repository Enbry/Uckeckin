'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
hat = require('hat'),
License = mongoose.model('License'),
Signal = mongoose.model('Signal'),
Beacon = mongoose.model('Beacon'),
Area = mongoose.model('Area'),
Zone = mongoose.model('Zone'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a license
*/
exports.create = function (req, res) {
  var license = new License(req.body);
  license.licenseAreas = req.body.licenseAreas;
  license.licenseZones = req.body.licenseZones;
  var signal = new Signal(req.body);
  var rack = hat.rack();
  signal.signalCode = rack().substr(0,5).toUpperCase();

  license.licenseBeacons = req.body.licenseBeacons;

  license.user = req.user;
  if (!license.licenseType){
    license.licenseType = 'Free';
  }
  //license.licenseSignals = rack().substr(0,5);

  if (license.beacon){
    license.licenseName = 'BLE000' + rack().substr(0,3).toUpperCase();
  }
  else{
    license.licenseName = 'STI000' + rack().substr(0,3).toUpperCase();
  }

  if (license.licenseStatus === "true"){
    license.licenseStatus = license.licenseStatus.replace("true", "Actif");
  }
  else {
    license.licenseStatus = license.licenseStatus.replace("false", "Inactif");
  }

  /*signal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(signal);
    }
  });*/

  license.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(license);
    }
  });
};

/**
* Show the current license
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var license = req.license ? req.license.toJSON() : {};
  license.isCurrentUserOwner = !!(req.user && license.user && license.user._id.toString() === req.user._id.toString());
  res.json(license);
};

/**
* Update a license
*/
exports.update = function (req, res) {
  var license = req.license;
  license.licenseName = req.body.licenseName;
  license.licenseType = req.body.licenseType;
  license.licenseStatus = req.body.licenseStatus;

  if (req.body.licenseSignals._id !== null){
    license.licenseSignals = req.body.licenseSignals;
  }
  if (req.body.licenseAreas._id !== null){
    license.licenseAreas = req.body.licenseAreas;
  }
  if (req.body.licenseZones._id !== null){
    license.licenseZones = req.body.licenseZones;
  }
  if (req.body.licenseBeacons._id !== null){
    license.licenseBeacons = req.body.licenseBeacons;
  }

  if (license.licenseAreas || license.licenseZones){
    license.licenseStatus = "true";
  }

  if (license.licenseStatus === "true"){
    license.licenseStatus = license.licenseStatus.replace("true", "Activée");
  }
  else {
    license.licenseStatus = license.licenseStatus.replace("false", "Désactivée");
  }

  license.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(license);
    }
  });
};

/**
* Delete a license
*/
exports.delete = function (req, res) {
  var license = req.license;

  license.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(license);
    }
  });
};

/**
* List of Licenses
*/
exports.list = function (req, res) {

  License.find().sort('-created').populate('user', 'displayName').populate('licenseSignals', 'signalCode').populate('licenseBeacons', 'beaconName').populate('licenseAreas', 'placeName').populate('licenseZones', 'zoneName').exec(function (err, licenses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(licenses);
    }
  });
};

/**
* License middleware
*/
exports.licenseByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'License is invalid'
    });
  }

  License.findById(id).populate('user', 'displayName').populate('licenseSignals', 'signalCode').populate('licenseBeacons', 'beaconName').populate('licenseAreas', 'placeName').populate('licenseZones', 'zoneName').exec(function (err, license) {
    if (err) {
      return next(err);
    } else if (!license) {
      return res.status(404).send({
        message: 'No license with that identifier has been found'
      });
    }
    req.license = license;
    next();
  });
};
