
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Bills state routing
    $stateProvider
    .state('bills', {
      url: '/bills',
      templateUrl: 'modules/bills/client/views/bills.client.view.html'
    })
    .state('bill', {
      url: '/bill',
      templateUrl: 'modules/bills/client/views/bill.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);
