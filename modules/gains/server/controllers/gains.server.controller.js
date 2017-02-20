'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
fs = require('fs'),
multer = require('multer'),
config = require(path.resolve('./config/config')),
Gain = mongoose.model('Gain'),
Signal = mongoose.model('Signal'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a gain
*/
exports.create = function (req, res) {
  var gain = new Gain(req.body);
  gain.user = req.user;
  gain.gainSignal = req.body.gainSignal;


  gain.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gain);
    }
  });
};

/**
* Update profile picture
*/
exports.changeGainPicture = function (req, res) {
  var gain = req.gain;
  var user = req.user;
  var message = null;
  var upload = multer(config.uploads.gainUpload).single('newGainPicture');
  var gainUploadFileFilter = require(path.resolve('./config/lib/multer')).gainUploadFileFilter;
  // Filtering to upload only images
  upload.fileFilter = gainUploadFileFilter;
  console.log(config.uploads.gainUpload.dest + req.file.filename);
  if (gain) {
    upload(req, res, function (uploadError) {
      if(uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading gain picture'
        });
      } else {
        gain.gainImageURL = config.uploads.gainUpload.dest + req.file.filename;

        gain.save(function (err) {

          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err),
            });
          } else {
            res.json(gain);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
* Show the current gain
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var gain = req.gain ? req.gain.toJSON() : {};

  // Determine if the current user is the owner
  gain.isCurrentUserOwner = !!(req.user && gain.user && gain.user._id.toString() === req.user._id.toString());

  res.json(gain);
};

/**
* Update a gain
*/
exports.update = function (req, res) {
  var gain = req.gain;

  gain.gainID = req.body.gainID;
  gain.gainName = req.body.gainName;
  gain.gainDesc = req.body.gainDesc;

  gain.gainImageURL = req.body.gainImageURL;
  gain.gainIcon = req.body.gainIcon;
  gain.gainContent = req.body.gainContent;

  if (req.body.gainSignal._id !== null){
    gain.gainSignal = req.body.gainSignal;
  }

  gain.gainFq = req.body.gainFq;
  gain.gainQuota = req.body.gainQuota;

  gain.gainStartDate = req.body.gainStartDate;
  gain.gainEndDate = req.body.gainEndDate;

  gain.gainDefaultContent = req.body.gainDefaultContent;
  gain.gainUCheckinDisplay = req.body.gainUCheckinDisplay;

  gain.gainMaxDisplay = req.body.gainMaxDisplay;
  gain.gainDisplayDelay = req.body.gainDisplayDelay;
  gain.gainPriority = req.body.gainPriority;
  gain.gainDistinctDisplayDelay = req.body.gainDistinctDisplayDelay;

  gain.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gain);
    }
  });
};

/**
* Delete a gain
*/
exports.delete = function (req, res) {
  var gain = req.gain;

  gain.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gain);
    }
  });
};

/**
* List of Gains
*/
exports.list = function (req, res) {
  Gain.find().sort('-created').populate('user', 'displayName').populate('gainSignal', 'signalCode').exec(function (err, gains) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gains);
    }
  });
};

/**
* Gain middleware
*/
exports.gainByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Gain is invalid'
    });
  }

  Gain.findById(id).populate('user', 'displayName').populate('gainSignal', 'signalCode').exec(function (err, gain) {
    if (err) {
      return next(err);
    } else if (!gain) {
      return res.status(404).send({
        message: 'No gain with that identifier has been found'
      });
    }
    req.gain = gain;
    next();
  });
};
