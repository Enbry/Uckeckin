'use strict';

/**
 * Module dependencies
 */
var areasPolicy = require('../policies/areas.server.policy'),
  areas = require('../controllers/areas.server.controller');

module.exports = function (app) {
  // Places collection routes
  app.route('/api/areas').all(areasPolicy.isAllowed)
    .get(areas.list)
    .post(areas.create);

  // Single place routes
  app.route('/api/areas/:areaId').all(areasPolicy.isAllowed)
    .get(areas.read)
    .put(areas.update)
    .delete(areas.delete);

  // Finish by binding the place middleware
  app.param('areaId', areas.areaByID);
};
