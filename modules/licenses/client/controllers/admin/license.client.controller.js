(function () {
  'use strict';

  angular
    .module('licenses.admin')
    .controller('LicensesAdminController', LicensesAdminController);

  LicensesAdminController.$inject = ['$scope', '$state', '$window', 'licenseResolve', 'Authentication'];

  function LicensesAdminController($scope, $state, $window, license, Authentication) {
    var vm = this;
    vm.license = license;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing License
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cette licence?')) {
        vm.license.$remove(function() {
          $state.go('admin.licenses.list');
        });
      }
    }

    // Save License
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licenseForm');
        return false;
      }

      // Create a new license, or update the current instance
      vm.license.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
