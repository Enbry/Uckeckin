'use strict';

module.exports = function (app) {
  // License Routes
  var bills = require('../controllers/bills.server.controller');

  // Setting up the users license api
  //app.route('/api/licenses/me').get(licenses.me);
  app.route('/api/bills').put(bills.update);

  // Finish by binding the license middleware
  app.param('billId', bills.billById);
};
