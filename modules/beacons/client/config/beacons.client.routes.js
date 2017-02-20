(function () {
  'use strict';

  angular
    .module('beacons.routes')
    .config(routeConfig);


  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('beacons', {
        abstract: true,
        url: '/beacons',
        template: '<ui-view/>'
      })
      .state('beacons.list', {
        url: '',
        templateUrl: 'modules/beacons/client/views/list-beacons.client.view.html',
        controller: 'BeaconsListController',
        controllerAs: 'vm',
      })
      .state('beacons.order', {
        url: '/order',
        templateUrl: 'modules/beacons/client/views/order-beacons.client.view.html',
        controller: 'BeaconsOrderController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: newBeacon
        },
      })
      .state('beacons.order-checkout', {
        url: '/order/:beaconId',
        templateUrl: 'modules/beacons/client/views/order-checkout-beacons.client.view.html',
        controller: 'BeaconsOrderController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        },
      })
      .state('beacons.view', {
        url: '/:beaconId',
        templateUrl: 'modules/beacons/client/views/view-beacon.client.view.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        },
      })
      .state('beacons.edit', {
        url: '/:beaconId/edit',
        templateUrl: 'modules/beacons/client/views/form-beacon.client.view.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        resolve: {
          beaconResolve: getBeacon
        }
      });
  }

  getBeacon.$inject = ['$stateParams', 'BeaconsService'];

  function getBeacon($stateParams, BeaconsService) {
    return BeaconsService.get({
      beaconId: $stateParams.beaconId
    }).$promise;
  }

  newBeacon.$inject = ['BeaconsService'];

  function newBeacon(BeaconsService) {
    return new BeaconsService();
  }
}());
