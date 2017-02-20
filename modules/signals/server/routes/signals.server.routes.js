'use strict';

/**
* Module dependencies
*/
var signalsPolicy = require('../policies/signals.server.policy'),
signals = require('../controllers/signals.server.controller');
module.exports = function (app) {

  // Signals collection routes
  app.route('/api/signals').all(signalsPolicy.isAllowed)
    .get(signals.list)
    .post(signals.create);

  // Single signal routes
  app.route('/api/signals/:signalId').all(signalsPolicy.isAllowed)
    .get(signals.read)
    .put(signals.update)
    .delete(signals.delete);

  // Finish by binding the signal middleware
  app.param('signalId', signals.signalByID);
};
