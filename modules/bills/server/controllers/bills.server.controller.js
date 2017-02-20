'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Bill = mongoose.model('Bill'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current license
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a License
 */
exports.update = function (req, res) {
  var bill = req.model;

  //For security purposes only merge these parameters
  bill.licenseName = req.body.licenseName;
  bill.licenseType = req.body.licenseType;
  bill.signal = req.body.signal;
  bill.place = req.body.place;
  bill.zone = req.body.zone;
  bill.beacon = req.body.beacon;
  bill.licenseStatus = req.body.licenseStatus;



  bill.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(bill);
  });
};

/**
 * Delete a license
 */
exports.delete = function (req, res) {
  var bill = req.model;

  bill.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(bill);
  });
};

/**
 * List of licenses
 */
exports.list = function (req, res) {
  Bill.find({}).exec(function (err, bills) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(bills);
  });
};

/**
 * License middleware
 */
exports.billById = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Invalid bill'
    });
  }

  Bill.findById(id).exec(function (err, bill) {
    if (err) {
      return next(err);
    } else if (!bill) {
      return next(new Error('Failed to load bill ' + id));
    }

    req.model = bill;
    next();
  });
};
