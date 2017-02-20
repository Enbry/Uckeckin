'use strict';

/**
 * Module dependencies
 */
var licensesPricesPolicy = require('../policies/prices-licenses.server.policy'),
  licensesPrices = require('../controllers/prices-licenses.server.controller');

module.exports = function (app) {
  // Licenses Prices collection routes
  app.route('/api/prices/licenses').all(licensesPricesPolicy.isAllowed)
    .get(licensesPrices.list)
    .post(licensesPrices.create);

    // Single license price routes
    app.route('/api/prices/licenses/:licensePriceId').all(licensesPricesPolicy.isAllowed)
      .get(licensesPrices.read)
      .put(licensesPrices.update)
      .delete(licensesPrices.delete);

  // Finish by binding the license price middleware
  app.param('licensePriceId', licensesPrices.licensePriceByID);
};
