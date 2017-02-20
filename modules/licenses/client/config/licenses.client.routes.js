(function () {
  'use strict';

  angular
    .module('licenses.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('licenses', {
        abstract: true,
        url: '/licenses',
        template: '<ui-view/>'
      })
      .state('licenses.list', {
        url: '',
        templateUrl: 'modules/licenses/client/views/list-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Liste Licences'
        }
      })
      .state('licenses.order', {
        url: '/order',
        templateUrl: 'modules/licenses/client/views/order-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm'
      })
      .state('licenses.order-checkout', {
        url: '/order/checkout',
        templateUrl: 'modules/licenses/client/views/order-checkout-licenses.client.view.html',
        controller: 'LicensesListController',
        controllerAs: 'vm'
      })
      .state('licenses.edit', {
        url: '/:licenseId/edit',
        templateUrl: 'modules/licenses/client/views/form-license.client.view.html',
        controller: 'LicensesController',
        controllerAs: 'vm',
        resolve: {
          licenseResolve: getLicense
        }
      });
  }
  // Create & get License datas
  getLicense.$inject = ['$stateParams', 'LicensesService'];

  function getLicense($stateParams, LicensesService) {
    return LicensesService.get({
      licenseId: $stateParams.licenseId
    }).$promise;
  }

  newLicense.$inject = ['LicensesService'];

  function newLicense(LicensesService) {
    return new LicensesService();
  }

}());
