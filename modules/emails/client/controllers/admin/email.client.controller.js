(function () {
  'use strict';

  angular
    .module('emails.admin')
    .controller('EmailsAdminController', EmailsAdminController);

  EmailsAdminController.$inject = ['$scope', '$state', '$window', 'emailResolve', 'Authentication'];

  function EmailsAdminController($scope, $state, $window, email, Authentication) {
    var vm = this;

    vm.email = email;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Email
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet email?')) {
        vm.email.$remove(function() {
          $state.go('admin.emails.list');
        });
      }
    }

    // Save Email
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emailForm');
        return false;
      }

      // Create a new email, or update the current instance
      vm.email.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.emails.list'); 
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
