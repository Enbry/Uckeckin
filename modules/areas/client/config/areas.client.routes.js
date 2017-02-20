(function () {
  'use strict';

  angular
    .module('areas.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('areas', {
        abstract: true,
        url: '/areas',
        template: '<ui-view/>'
      })
      .state('areas.list', {
        url: '',
        templateUrl: 'modules/areas/client/views/list-areas.client.view.html',
        controller: 'AreasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Lieux'
        }
      })
      .state('areas.create', {
        url: '/create',
        templateUrl: 'modules/areas/client/views/form-area.client.view.html',
        controller: 'AreasController',
        controllerAs: 'vm',
        resolve: {
          areaResolve: newArea
        }
      })
      .state('areas.edit', {
        url: '/:areaId/edit',
        templateUrl: 'modules/areas/client/views/form-area.client.view.html',
        controller: 'AreasController',
        controllerAs: 'vm',
        resolve: {
          areaResolve: getArea
        }
      });
  }

  getArea.$inject = ['$stateParams', 'AreasService'];

  function getArea($stateParams, AreasService) {
    return AreasService.get({
      areaId: $stateParams.areaId
    }).$promise;
  }

  newArea.$inject = ['AreasService'];

  function newArea(AreasService) {
    return new AreasService();
  }
}());
