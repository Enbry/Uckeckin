(function () {
  'use strict';

  angular
    .module('emails.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.emails', {
        abstract: true,
        url: '/emails',
        template: '<ui-view/>'
      })
      .state('admin.emails.list', {
        url: '',
        templateUrl: 'modules/emails/client/views/admin/list-emails.client.view.html',
        controller: 'EmailsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: newEmail
        }
      })
      .state('admin.emails.create', {
        url: '/create',
        templateUrl: 'modules/emails/client/views/admin/form-email.client.view.html',
        controller: 'EmailsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: newEmail
        }
      })
      .state('admin.emails.edit', {
        url: '/:emailId/edit',
        templateUrl: 'modules/emails/client/views/admin/form-email.client.view.html',
        controller: 'EmailsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          emailResolve: getEmail
        }
      });
  }

  getEmail.$inject = ['$stateParams', 'EmailsService'];

  function getEmail($stateParams, EmailsService) {
    return EmailsService.get({
      emailId: $stateParams.emailId
    }).$promise;
  }

  newEmail.$inject = ['EmailsService'];

  function newEmail(EmailsService) {
    return new EmailsService();
  }
}());
