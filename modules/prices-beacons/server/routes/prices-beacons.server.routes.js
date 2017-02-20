'use strict';

/**
 * Module dependencies
 */
var beaconsPricesPolicy = require('../policies/prices-beacons.server.policy'),
  beaconsPrices = require('../controllers/prices-beacons.server.controller');

module.exports = function (app) {
  // Beacons Prices collection routes
  app.route('/api/prices/beacons').all(beaconsPricesPolicy.isAllowed)
    .get(beaconsPrices.list)
    .post(beaconsPrices.create);

    // Single beacon price routes
    app.route('/api/prices/beacons/:beaconPriceId').all(beaconsPricesPolicy.isAllowed)
      .get(beaconsPrices.read)
      .put(beaconsPrices.update)
      .delete(beaconsPrices.delete);

  // Finish by binding the beacon price middleware
  app.param('beaconPriceId', beaconsPrices.beaconPriceByID);
};
