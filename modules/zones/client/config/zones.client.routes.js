(function () {
  'use strict';

  angular
    .module('zones.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('zones', {
        abstract: true,
        url: '/zones',
        template: '<ui-view/>'
      })
      .state('zones.list', {
        url: '',
        templateUrl: 'modules/zones/client/views/list-zones.client.view.html',
        controller: 'ZonesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Zones'
        }
      })
      .state('zones.create', {
        url: '/create',
        templateUrl: 'modules/zones/client/views/form-zone.client.view.html',
        controller: 'ZonesController',
        controllerAs: 'vm',
        resolve: {
          zoneResolve: newZone
        }
      })
      .state('zones.edit', {
        url: '/:zoneId/edit',
        templateUrl: 'modules/zones/client/views/form-zone.client.view.html',
        controller: 'ZonesController',
        controllerAs: 'vm',
        resolve: {
          zoneResolve: getZone
        }
      });
  }

  getZone.$inject = ['$stateParams', 'ZonesService'];

  function getZone($stateParams, ZonesService) {
    return ZonesService.get({
      zoneId: $stateParams.zoneId
    }).$promise;
  }

  newZone.$inject = ['ZonesService'];

  function newZone(ZonesService) {
    return new ZonesService();
  }
}());
