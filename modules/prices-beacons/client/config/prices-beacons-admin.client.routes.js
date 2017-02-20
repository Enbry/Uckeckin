(function () {
  'use strict';

  angular
    .module('prices-beacons.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.prices-beacons', {
        abstract: true,
        url: '/prices/beacons',
        template: '<ui-view/>'
      })
      .state('admin.prices-beacons.list', {
        url: '',
        templateUrl: 'modules/prices-beacons/client/views/admin/list-prices-beacons.client.view.html',
        controller: 'BeaconsPricesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: newBeaconPrice
        }
      })
      .state('admin.prices-beacons.create', {
        url: '/create',
        templateUrl: 'modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html',
        controller: 'BeaconsPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: newBeaconPrice
        }
      })
      .state('admin.prices-beacons.edit', {
        url: '/:beaconPriceId/edit',
        templateUrl: 'modules/prices-beacons/client/views/admin/form-price-beacon.client.view.html',
        controller: 'BeaconsPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconPriceResolve: getBeaconPrice
        }
      });
  }

  getBeaconPrice.$inject = ['$stateParams', 'BeaconsPricesService'];

  function getBeaconPrice($stateParams, BeaconsPricesService) {
    return BeaconsPricesService.get({
      beaconPriceId: $stateParams.beaconPriceId
    }).$promise;
  }

  newBeaconPrice.$inject = ['BeaconsPricesService'];

  function newBeaconPrice(BeaconsPricesService) {
    return new BeaconsPricesService();
  }
}());
