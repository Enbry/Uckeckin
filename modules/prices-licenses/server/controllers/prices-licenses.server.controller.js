'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  LicensePrice = mongoose.model('LicensePrice'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a license price
 */
exports.create = function (req, res) {
  var licensePrice = new LicensePrice(req.body);
  licensePrice.licenseQty = req.body.licenseQty;
  licensePrice.licensePrice = req.body.licensePrice;
  licensePrice.licenseRed1 = req.body.licenseRed1;
  licensePrice.licenseRed3 = req.body.licenseRed3;
  licensePrice.licenseRed6 = req.body.licenseRed6;
  licensePrice.licenseRed12 = req.body.licenseRed12;

  licensePrice.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(licensePrice);
    }
  });
};

/**
 * Show the current license price
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var licensePrice = req.licensePrice ? req.licensePrice.toJSON() : {};

  res.json(licensePrice);
};

/**
 * Update a license price
 */
exports.update = function (req, res) {
  var licensePrice = req.licensePrice;
  licensePrice.licenseQty = req.body.licenseQty;
  licensePrice.licensePrice = req.body.licensePrice;
  licensePrice.licenseRed1 = req.body.licenseRed1;
  licensePrice.licenseRed3 = req.body.licenseRed3;
  licensePrice.licenseRed6 = req.body.licenseRed6;
  licensePrice.licenseRed12 = req.body.licenseRed12;
  licensePrice.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(licensePrice);
    }
  });
};

/**
 * Delete a license price
 */
exports.delete = function (req, res) {
  var licensePrice = req.licensePrice;

  licensePrice.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(licensePrice);
    }
  });
};

/**
 * List of Licenses Prices
 */
exports.list = function (req, res) {
  LicensePrice.find().sort({ licenseQty: 1 }).exec(function (err, licensePrices) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(licensePrices);

    }
  });
};

/**
 * License Price middleware
 */
exports.licensePriceByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'License Price is invalid'
    });
  }

  LicensePrice.findById(id).exec(function (err, licensePrice) {
    if (err) {
      return next(err);
    } else if (!licensePrice) {
      return res.status(404).send({
        message: 'No license price with that identifier has been found'
      });
    }
    req.licensePrice = licensePrice;
    next();
  });
};
