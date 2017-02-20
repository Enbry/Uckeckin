'use strict';

/**
* Module dependencies
*/
var evtsPolicy = require('../policies/events.server.policy'),
  evts = require('../controllers/events.server.controller');
  //multiparty = require('connect-multiparty'),
  //multipartyMiddleware = multiparty();

module.exports = function (app) {
  // Gains collection routes
  app.route('/api/events').all(evtsPolicy.isAllowed)
  .get(evts.list)
  .post(evts.create)
  .delete(evts.delete);

  // Single gain routes
  app.route('/api/events/:eventId').all(evtsPolicy.isAllowed)
  .get(evts.read)
  .put(evts.update)
  .delete(evts.delete);

  // Finish by binding the event middleware
  app.param('eventId', evts.evtByID);
};
