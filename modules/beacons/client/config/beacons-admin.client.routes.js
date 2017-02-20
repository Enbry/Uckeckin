(function () {
  'use strict';

  angular
    .module('beacons.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.beacons', {
        abstract: true,
        url: '/beacons',
        template: '<ui-view/>'
      })
      .state('admin.beacons.list', {
        url: '',
        templateUrl: 'modules/beacons/client/views/admin/list-beacons.client.view.html',
        controller: 'BeaconsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconResolve: newBeacon
        }
      })
      .state('admin.beacons.create', {
        url: '/create',
        templateUrl: 'modules/beacons/client/views/admin/form-beacon.client.view.html',
        controller: 'BeaconsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          beaconResolve: newBeacon
        }
      })
      .state('admin.beacons.edit', {
        url: '/:beaconId/edit',
        templateUrl: 'modules/beacons/client/views/admin/form-beacon.client.view.html',
        controller: 'BeaconsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
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
