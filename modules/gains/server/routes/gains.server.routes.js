'use strict';

/**
 * Module dependencies
 */
var gainsPolicy = require('../policies/gains.server.policy'),
  gains = require('../controllers/gains.server.controller');

module.exports = function (app) {
  // Gains collection routes
  app.route('/api/gains').all(gainsPolicy.isAllowed)
    .get(gains.list)
    //.put(gains.update)
    .post(gains.create);
  //  .delete(gains.delete);

  // Single gain routes
  app.route('/api/gains/:gainId').all(gainsPolicy.isAllowed)
    .get(gains.read)
    .put(gains.update)
    .delete(gains.delete);

  app.route('api/gains/picture')
  .post(gains.changeGainPicture);

  // Finish by binding the gain middleware
  app.param('gainId', gains.gainByID);
};
