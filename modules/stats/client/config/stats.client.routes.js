(function () {
  'use strict';

  angular
    .module('stats.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stats', {
        abstract: true,
        url: '/stats',
        template: '<ui-view/>'
      })
      .state('stats.list', {
        url: '',
        templateUrl: 'modules/stats/client/views/list-stats.client.view.html',
        controller: 'StatsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Stats'
        }
      })
      .state('stats.create', {
        url: '/create',
        templateUrl: 'modules/stats/client/views/form-stat.client.view.html',
        controller: 'StatsController',
        controllerAs: 'vm',
        resolve: {
          statResolve: newStat
        }
      })
      .state('stats.edit', {
        url: '/:statId/edit',
        templateUrl: 'modules/stats/client/views/form-stat.client.view.html',
        controller: 'StatsController',
        controllerAs: 'vm',
        resolve: {
          statResolve: getStat
        }
      });
  }

  getStat.$inject = ['$stateParams', 'StatsService'];

  function getStat($stateParams, StatsService) {
    return StatsService.get({
      statId: $stateParams.statId
    }).$promise;
  }

  newStat.$inject = ['StatsService'];

  function newStat(StatsService) {
    return new StatsService();
  }
}());
