'use strict';

/**
* Module dependencies
*/
var path = require('path'),
mongoose = require('mongoose'),
hat = require('hat'),
_ = require('lodash'),
exec = require('child_process').exec,
Signal = mongoose.model('Signal'),
Filesaver = require('file-saver'),
fs = require('fs'),
Beacon = mongoose.model('Beacon'),
License = mongoose.model('License'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
* Create a signal
*/
exports.create = function (req, res) {
  var signal = new Signal(req.body);
  signal.user = req.user;
  signal.signalLicenses = req.body.signalLicenses;
  signal.signalBeacons = req.body.signalBeacons;
  var rack = hat.rack();
  signal.signalCode = rack().substr(0,5).toUpperCase();

  /*exec('modules/signals/producer -v '+ signal.signalCode + ' -l 17000 -m 18000 -f modules/signals/client/sounds/C1-' + signal.signalCode + '.wav', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('modules/signals/producer -v '+ signal.signalCode + ' -l 18000 -m 19000 -f modules/signals/client/sounds/C2-' + signal.signalCode + '.wav', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('modules/signals/producer -v '+ signal.signalCode + ' -l 19000 -m 20000 -f modules/signals/client/sounds/C3-' + signal.signalCode + '.wav', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('modules/signals/producer -v '+ signal.signalCode + ' -l 20000 -m 21000 -f modules/signals/client/sounds/C4-' + signal.signalCode + '.wav', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('ffmpeg -i modules/signals/client/sounds/C1-' + signal.signalCode + '.wav -b:a 256k modules/signals/client/sounds/C1-' + signal.signalCode + '.mp3 ', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('ffmpeg -i modules/signals/client/sounds/C2-' + signal.signalCode + '.wav -b:a 256k modules/signals/client/sounds/C2-' + signal.signalCode + '.mp3 ', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('ffmpeg -i modules/signals/client/sounds/C3-' + signal.signalCode + '.wav -b:a 256k modules/signals/client/sounds/C3-' + signal.signalCode + '.mp3 ', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });

  exec('ffmpeg -i modules/signals/client/sounds/C4-' + signal.signalCode + '.wav -b:a 256k modules/signals/client/sounds/C4-' + signal.signalCode + '.mp3 ', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });*/

  signal.save(function (err) {

    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(signal);
    }
  });
};

/**
* Show the current signal
*/
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var signal = req.signal ? req.signal.toJSON() : {};
  signal.isCurrentUserOwner = !!(req.user && signal.user && signal.user._id.toString() === req.user._id.toString());
  res.json(signal);
};

/**
* Update a signal
*/
exports.update = function (req, res) {
  var signal = req.signal;
  signal.signalCode = req.body.signalCode;
  signal.signalLicenses = req.body.signalLicenses;
  signal.signalBeacons = req.body.signalBeacons;
  signal.signalStatus = req.body.signalStatus;
  signal.signalSounds.channel1 = req.body.signalSounds.channel1;
  signal.signalSounds.channel2 = req.body.signalSounds.channel2;
  signal.signalSounds.channel3 = req.body.signalSounds.channel3;

  if (req.body.signalBeacons._id !== null){
    signal.signalBeacons = req.body.signalBeacons;
  }

  if (signal.signalStatus === "true"){
    signal.signalStatus = signal.signalStatus.replace("true", "Actif");
  }
  else {
    signal.signalStatus = signal.signalStatus.replace("false", "Inactif");
  }

  signal.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(signal);
    }
  });
};

/**
* Delete a signal
*/
exports.delete = function (req, res) {
  var signal = req.signal;

  signal.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(signal);
    }
  });
};

/**
* List of Signals
*/
exports.list = function (req, res) {

  Signal.find().sort('-created').populate('user', 'displayName').populate('signalLicenses', 'licenseName').populate('signalBeacons', 'beaconName').exec(function (err, signals) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(signals);
    }
  });
};

/**
* Signal middleware
*/
exports.signalByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Signal is invalid'
    });
  }

  Signal.findById(id).populate('user', 'displayName').populate('signalLicenses', 'licenseName').populate('signalBeacons', 'beaconName').exec(function (err, signal) {
    if (err) {
      return next(err);
    } else if (!signal) {
      return res.status(404).send({
        message: 'No signal with that identifier has been found'
      });
    }
    req.signal = signal;
    next();
  });
};
