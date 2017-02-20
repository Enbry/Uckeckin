'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
//moment = require('moment'),
fs = require('fs'),
multer = require('multer'),
config = require(path.resolve('./config/config')),
Evt = mongoose.model('Evt'),
Signal = mongoose.model('Signal'),
//time = require('node-time')(Date),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create an event
*/
exports.create = function (req, res) {
  var evt = new Evt(req.body);
  evt.eventSignal = req.body.eventSignal;
  evt.user = req.user;

  if (evt.eventPrivacy){
    evt.eventPrivacy = evt.eventPrivacy.toString().replace("true", "Privé");
  }

  evt.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evt);
    }
  });

};






/**
* Show the current event
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var evt = req.evt ? req.evt.toJSON() : {};

  // Determine if the current user is the owner
  evt.isCurrentUserOwner = !!(req.user && evt.user && evt.user._id.toString() === req.user._id.toString());

  res.json(evt);
};

/**
* Update an event
*/
exports.update = function (req, res) {
  var evt = req.evt;

  evt.eventID = req.body.eventID;
  evt.eventName = req.body.eventName;
  evt.eventShortDesc = req.body.eventShortDesc;
  evt.eventLongDesc = req.body.eventLongDesc;

  evt.eventPicture = req.body.eventPicture;
  evt.eventIcon = req.body.eventIcon;
  evt.eventContent = req.body.eventContent;

  evt.eventSignal = req.body.eventSignal;

  evt.eventStartDate = req.body.eventStartDate;
  evt.eventEndDate = req.body.eventEndDate;
  evt.eventPublishStartDate = req.body.eventPublishStartDate;
  evt.eventPublishEndDate = req.body.eventPublishEndDate;

  evt.eventPrivacy = req.body.eventPrivacy;

  evt.formatted_address = req.body.formatted_address;
  evt.eventLat = req.body.eventLat;
  evt.eventLng = req.body.eventLng;

  evt.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evt);
    }
  });
};

/**
* Delete an event
*/
exports.delete = function (req, res) {
  var evt = req.evt;

  evt.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evt);
    }
  });
};

/**
* List of Events
*/
exports.list = function (req, res) {
  Evt.find().sort('-created').populate('user', 'displayName').populate('eventSignal', 'signalCode').exec(function (err, evts) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(evts);
    }
  });
};



/**
* Event middleware
*/
exports.evtByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Event is invalid'
    });
  }

  Evt.findById(id).populate('user', 'displayName').populate('eventSignal', 'signalCode').exec(function (err, evt) {
    if (err) {
      return next(err);
    } else if (!evt) {
      return res.status(404).send({
        message: 'No event with that identifier has been found'
      });
    }
    req.evt = evt;
    next();
  });
};
