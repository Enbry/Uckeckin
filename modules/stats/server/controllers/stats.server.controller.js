'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Stat = mongoose.model('Stat'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a log
 */
exports.create = function (req, res) {
  var stat = new Stat(req.body);
  stat.user = req.user;

  stat.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stat);
    }
  });
};

/**
 * Show the current log
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var stat = req.stat ? req.stat.toJSON() : {};

  // Determine if the current user is the owner
  stat.isCurrentUserOwner = !!(req.user && stat.user && stat.user._id.toString() === req.user._id.toString());

  res.json(stat);
};

/**
 * Update a log
 */
exports.update = function (req, res) {
  var stat = req.stat;

  stat.logID = req.body.logID;
  stat.bundleIdentifier = req.body.bundleIdentifier;
  stat.logPlatform = req.body.logPlatform;
  stat.logModel = req.body.logModel;
  stat.logVersion = req.body.logVersion;
  stat.logChannel = req.body.logChannel;

  stat.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stat);
    }
  });
};

/**
 * Delete a stat
 */
exports.delete = function (req, res) {
  var stat = req.stat;

  stat.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(stat);
    }
  });
};

/**
 * List of Stats
 */
exports.list = function (req, res) {
  Stat.find().sort('-created').populate('user', 'displayName').exec(function (err, stats) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {

      res.json(stats);
    }
  });
};

/**
 * Stat middleware
 */
exports.statByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Log is invalid'
    });
  }

  Stat.findById(id).populate('user', 'displayName').exec(function (err, stat) {
    if (err) {
      return next(err);
    } else if (!stat) {
      return res.status(404).send({
        message: 'No log with that identifier has been found'
      });
    }
    req.stat = stat;
    next();
  });
};
