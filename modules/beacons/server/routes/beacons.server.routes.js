'use strict';

/**
* Module dependencies
*/
var beaconsPolicy = require('../policies/beacons.server.policy'),
beacons = require('../controllers/beacons.server.controller');

module.exports = function (app) {
  // Beacons collection routes
  app.route('/api/beacons').all(beaconsPolicy.isAllowed)
  .get(beacons.list)
  //.post(beacons.charge)
  .post(beacons.create);

  // Stripe beacons charges
  app.route('/api/beacons/order').all(beaconsPolicy.isAllowed)
  .get(beacons.charge)
  .post(beacons.charge);

  app.route('/api/beacons/order/:beaconId').all(beaconsPolicy.isAllowed)
  .get(beacons.charge);

  // Single beacon routes
  app.route('/api/beacons/:beaconId').all(beaconsPolicy.isAllowed)
  .get(beacons.read)
  .get(beacons.charge)
  .put(beacons.update)
  .delete(beacons.delete);

  // Finish by binding the beacon middleware
  app.param('beaconId', beacons.beaconByID);
};
