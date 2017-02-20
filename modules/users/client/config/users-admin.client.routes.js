(function () {
  'use strict';

  // Setting up route
  angular
  .module('users.admin.routes')
  .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('admin.users', {
      url: '/users',
      templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
      controller: 'UserListController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Users List'
      }
    })
    .state('admin.user', {
      url: '/users/:userId',
      templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        userResolve: getUser
      },
      data: {
        pageTitle: 'Edit {{ userResolve.displayName }}'
      }
    })
    .state('admin.user-edit', {
      url: '/users/:userId/edit',
      templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        userResolve: getUser
      },
      data: {
        pageTitle: 'Edit User {{ userResolve.displayName }}'
      }
    })
    .state('admin.user-create', {
      url: '/users/create',
      templateUrl: 'modules/licenses/client/views/admin/edit-user.client.view.html',
      controller: 'UserController',
      controllerAs: 'vm',
      resolve: {
        licenseResolve: newUser
      }
    });
  }
  getUser.$inject = ['$stateParams', 'AdminService'];

  function getUser($stateParams, AdminService) {
    return AdminService.get({
      userId: $stateParams.userId
    }).$promise;
  }
  newUser.$inject = ['AdminService'];

  function newUser(AdminService) {
    return new AdminService();
  }

}());
