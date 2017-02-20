'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  BeaconPrice = mongoose.model('BeaconPrice'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a beacon price
 */
exports.create = function (req, res) {
  var beaconPrice = new BeaconPrice(req.body);
  beaconPrice.beaconQty = req.body.beaconQty;
  beaconPrice.beaconPrice = req.body.beaconPrice;
  beaconPrice.beaconTotalPrice = (beaconPrice.beaconQty)*(beaconPrice.beaconPrice);

  beaconPrice.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beaconPrice);
    }
  });
};

/**
 * Show the current beacon price
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var beaconPrice = req.beaconPrice ? req.beaconPrice.toJSON() : {};

  res.json(beaconPrice);
};

/**
 * Update a beacon price
 */
exports.update = function (req, res) {
  var beaconPrice = req.beaconPrice;

  beaconPrice.beaconQty = req.body.beaconQty;
  beaconPrice.beaconPrice = req.body.beaconPrice;
  beaconPrice.beaconTotalPrice = (beaconPrice.beaconQty)*(beaconPrice.beaconPrice);

  beaconPrice.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beaconPrice);
    }
  });
};

/**
 * Delete a beacon price
 */
exports.delete = function (req, res) {
  var beaconPrice = req.beaconPrice;

  beaconPrice.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beaconPrice);
    }
  });
};

/**
 * List of Beacons Prices
 */
exports.list = function (req, res) {
  BeaconPrice.find().sort({ beaconQty: 1 }).exec(function (err, beaconPrices) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(beaconPrices);

    }
  });
};

/**
 * Beacon Price middleware
 */
exports.beaconPriceByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Beacon Price is invalid'
    });
  }

  BeaconPrice.findById(id).exec(function (err, beaconPrice) {
    if (err) {
      return next(err);
    } else if (!beaconPrice) {
      return res.status(404).send({
        message: 'No beacon price with that identifier has been found'
      });
    }
    req.beaconPrice = beaconPrice;
    next();
  });
};
