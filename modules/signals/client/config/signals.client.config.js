(function () {
  'use strict';

  angular
    .module('signals.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('signals', {
        abstract: true,
        url: '/signals',
        template: '<ui-view/>'
      })
      .state('signals.list', {
        url: '',
        templateUrl: 'modules/signals/client/views/list-signals.client.view.html',
        controller: 'SignalsListController',
        controllerAs: 'vm'
      })
      .state('signals.create', {
        url: '/create',
        templateUrl: 'modules/signals/client/views/form-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: newSignal
        }
      })
      .state('signals.view', {
        url: '/:signalId',
        templateUrl: 'modules/signals/client/views/view-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: getSignal
        }
      })
      .state('signals.edit', {
        url: '/:signalId/edit',
        templateUrl: 'modules/signals/client/views/form-signal.client.view.html',
        controller: 'SignalsController',
        controllerAs: 'vm',
        resolve: {
          signalResolve: getSignal
        }
      });
  }

  getSignal.$inject = ['$stateParams', 'SignalsService'];

  function getSignal($stateParams, SignalsService) {
    return SignalsService.get({
      signalId: $stateParams.signalId
    }).$promise;
  }

  newSignal.$inject = ['SignalsService'];

  function newSignal(SignalsService) {
    return new SignalsService();
  }
}());
