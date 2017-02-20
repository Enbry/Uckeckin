'use strict';

/**
 * Module dependencies
 */
var statsPolicy = require('../policies/stats.server.policy'),
  stats = require('../controllers/stats.server.controller');

module.exports = function (app) {
  // Logs collection routes
  app.route('/api/stats').all(statsPolicy.isAllowed)
    .get(stats.list)
    .post(stats.create);

  // Single log routes
  app.route('/api/stats/:statId').all(statsPolicy.isAllowed)
    .get(stats.read)
    .put(stats.update)
    .delete(stats.delete);

  // Finish by binding the log middleware
  app.param('statId', stats.statByID);
};
