(function () {
  'use strict';

  angular
  .module('gains.routes')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('gains', {
      abstract: true,
      url: '/gains',
      template: '<ui-view/>'
    })
    .state('gains.list', {
      url: '',
      templateUrl: 'modules/gains/client/views/list-gains.client.view.html',
      controller: 'GainsListController',
      controllerAs: 'vm',
      resolve: {
        gainResolve: newGain
      }
    })
    .state('gains.create', {
      url: '/create',
      templateUrl: 'modules/gains/client/views/form-gain.client.view.html',
      controller: 'GainsController',
      controllerAs: 'vm',
      resolve: {
        gainResolve: newGain
      }
    })
    .state('gains.edit', {
      url: '/:gainId/edit',
      templateUrl: 'modules/gains/client/views/form-gain.client.view.html',
      controller: 'GainsController',
      controllerAs: 'vm',
      resolve: {
        gainResolve: getGain
      }
    })
    .state('gains.view', {
      url: '/:gainId',
      templateUrl: 'modules/gains/client/views/view-gain.client.view.html',
      controller: 'GainsController',
      controllerAs: 'vm',
      resolve: {
        gainResolve: getGain
      }
    });
  }

  getGain.$inject = ['$stateParams', 'GainsService'];

  function getGain($stateParams, GainsService) {
    return GainsService.get({
      gainId: $stateParams.gainId
    }).$promise;
  }

  newGain.$inject = ['GainsService'];

  function newGain(GainsService) {
    return new GainsService();
  }
}());
