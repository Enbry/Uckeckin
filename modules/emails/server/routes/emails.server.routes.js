'use strict';

/**
 * Module dependencies
 */
var emailsPolicy = require('../policies/emails.server.policy'),
  emails = require('../controllers/emails.server.controller');

module.exports = function (app) {
  // Emails collection routes
  app.route('/api/emails').all(emailsPolicy.isAllowed)
    .get(emails.list)
    .post(emails.create);
    //.delete(emails.remove);

    // Single email routes
    app.route('/api/emails/:emailId').all(emailsPolicy.isAllowed)
      .get(emails.read)
      .put(emails.update)
      .delete(emails.delete);
  // Finish by binding the email middleware
  app.param('emailId', emails.emailByID);
};
