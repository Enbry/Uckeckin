'use strict';

/**
* Module dependencies
*/
var licensesPolicy = require('../policies/licenses.server.policy'),
licenses = require('../controllers/licenses.server.controller');
module.exports = function (app) {
  // Licenses collection routes
  app.route('/api/licenses').all(licensesPolicy.isAllowed)
    .get(licenses.list)
    .post(licenses.create);

// Licenses orders routes
  app.route('/api/licenses/order').all(licensesPolicy.isAllowed)
    .get(licenses.list)
    .post(licenses.create);

  // Single license routes
  app.route('/api/licenses/:licenseId').all(licensesPolicy.isAllowed)
    .get(licenses.read)
    .put(licenses.update)
    .delete(licenses.delete);

  // Finish by binding the license middleware
  app.param('licenseId', licenses.licenseByID);
};
