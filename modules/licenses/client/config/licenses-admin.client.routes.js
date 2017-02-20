(function () {
  'use strict';

  angular
    .module('licenses.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.licenses', {
        abstract: true,
        url: '/licenses',
        template: '<ui-view/>'
      })
      .state('admin.licenses.list', {
        url: '',
        templateUrl: 'modules/licenses/client/views/admin/list-licenses.client.view.html',
        controller: 'LicensesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.licenses.create', {
        url: '/create',
        templateUrl: 'modules/licenses/client/views/admin/form-license.client.view.html',
        controller: 'LicensesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licenseResolve: newLicense
        }
      })
      .state('admin.licenses.edit', {
        url: '/:licenseId/edit',
        templateUrl: 'modules/licenses/client/views/admin/form-license.client.view.html',
        controller: 'LicensesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          licenseResolve: getLicense
        }
      });
  }

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
