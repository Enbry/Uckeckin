'use strict';

/**
* Module dependencies
*/
var path = require('path'),
//moment = require('moment'),
mongoose = require('mongoose'),
stripe = require('stripe')('sk_test_RCaQU2dAtW3Go7rQZeHWxnjE'),
Beacon = mongoose.model('Beacon'),
BeaconPrice = mongoose.model('BeaconPrice'),
License = mongoose.model('License'),
Signal = mongoose.model('Signal'),
User = mongoose.model('User'),
hat = require('hat'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a beacon
*/
exports.create = function (req, res) {
  var beacon = new Beacon(req.body);
  beacon.user = req.user;
  beacon.beaconPrices = req.body.beaconPrices;
  beacon.beaconLicenses = req. body.beaconLicenses;
  beacon.beaconSignals = req.body.beaconSignals;

  var rack = hat.rack();
  //beacon.beaconSignals = rack();
  //beacon.beaconSignals = beacon.beaconSignals.substr(0,5);
  beacon.beaconName = 'B000' + rack().substr(0,5).toUpperCase();

  beacon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beacon);
    }
  });
};

/**
* Charge a beacon*/
exports.charge = function(req, res, next){
  var beacon = req.beacon;
  var beaconID = req.beacon._id;
  var token = req.body.stripeToken;
  var userID = req.user._id;

  // Simple validation
  Beacon.findById(beaconID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      // Get product details
      User.findById(userID, function(err, data) {
        if (err) {
          return next(err);
        } else {
          data.beaconOrder.push({ beaconID: beaconID, token: token });
          data.save();
        }
      });
      // Create Charge
      var charge = {
        amount: parseInt(req.body.beaconTotalOrder)*100,
        source: token,
        currency: 'USD',
        card: token
      };
      stripe.charges.create(charge, function(err, charge) {
        if(err) {
          return next(err);
        } else {
          req.flash('message', {
            status: 'success',
            value: 'Thanks for purchasing a '+req.body.beaconType+'!'
          });
          res.redirect('/');
        }
      });

    }
  });
};

/**
* Show the current beacon
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var beacon = req.beacon ? req.beacon.toJSON() : {};

  res.json(beacon);
};

/**
* Update a beacon
*/
exports.update = function (req, res) {
  var beacon = req.beacon;

  beacon.beaconType = req.body.beaconType;
  beacon.beaconSignals = req.body.beaconSignals;
  beacon.beaconPrice = req.body.beaconPrice;
  // beacon.beaconQty = req.body.beaconQty;

  beacon.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beacon);
    }
  });
};

/**
* Delete a beacon
*/
exports.delete = function (req, res) {
  var beacon = req.beacon;

  beacon.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beacon);
    }
  });
};

/**
* List of Beacons
*/
exports.list = function (req, res) {
  Beacon.find().sort('-created').populate('user', 'displayName').populate('beaconLicense', 'licenseName').populate('beaconSignals', 'signalCode').populate('beaconPrice').exec(function (err, beacons) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beacons);
    }
  });
};

/**
* Beacon middleware
*/
exports.beaconByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Beacon is invalid'
    });
  }

  Beacon.findById(id).populate('user', 'displayName').populate('beaconLicense', 'licenseName').populate('beaconSignals', 'signalCode').populate('beaconPrice').exec(function (err, beacon) {
    if (err) {
      return next(err);
    } else if (!beacon) {
      return res.status(404).send({
        message: 'No beacon with that identifier has been found'
      });
    }
    req.beacon = beacon;
    next();
  });
};
