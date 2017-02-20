'use strict';

/**
 * Module dependencies
 */
var zonesPolicy = require('../policies/zones.server.policy'),
  zones = require('../controllers/zones.server.controller');

module.exports = function (app) {
  // Zones collection routes
  app.route('/api/zones').all(zonesPolicy.isAllowed)
    .get(zones.list)
    .post(zones.create);

  // Single zone routes
  app.route('/api/zones/:zoneId').all(zonesPolicy.isAllowed)
    .get(zones.read)
    .put(zones.update)
    .delete(zones.delete);

  // Binding the zone middleware
  app.param('zoneId', zones.zoneByID);
};
