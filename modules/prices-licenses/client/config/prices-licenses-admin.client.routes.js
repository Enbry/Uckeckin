(function () {
  'use strict';

  angular
    .module('prices-licenses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.prices-licenses', {
        abstract: true,
        url: '/prices/licenses',
        template: '<ui-view/>'
      })
      .state('admin.prices-licenses.list', {
        url: '',
        templateUrl: 'modules/prices-licenses/client/views/admin/list-prices-licenses.client.view.html',
        controller: 'LicensesPricesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: newLicensePrice
        }
      })
      .state('admin.prices-licenses.create', {
        url: '/create',
        templateUrl: 'modules/prices-licenses/client/views/admin/form-price-license.client.view.html',
        controller: 'LicensesPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: newLicensePrice
        }
      })
      .state('admin.prices-licenses.edit', {
        url: '/:licensePriceId/edit',
        templateUrl: 'modules/prices-licenses/client/views/admin/form-price-license.client.view.html',
        controller: 'LicensesPricesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licensePriceResolve: getLicensePrice
        }
      });
  }

  getLicensePrice.$inject = ['$stateParams', 'LicensesPricesService'];

  function getLicensePrice($stateParams, LicensesPricesService) {
    return LicensesPricesService.get({
      licensePriceId: $stateParams.licensePriceId
    }).$promise;
  }

  newLicensePrice.$inject = ['LicensesPricesService'];

  function newLicensePrice(LicensesPricesService) {
    return new LicensesPricesService();
  }
}());
