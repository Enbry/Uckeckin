(function () {
  'use strict';

  angular
    .module('prices-licenses.admin')
    .controller('LicensesPricesAdminController', LicensesPricesAdminController);

  LicensesPricesAdminController.$inject = ['$scope', '$state', '$window', 'licensePriceResolve', 'Authentication'];

  function LicensesPricesAdminController($scope, $state, $window, licensePrice, Authentication) {
    var vm = this;

    vm.licensePrice = licensePrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing License Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.licensePrice.$remove(function() {
          $state.go('admin.prices-licenses.list');
        });
      }
    }

    // Save License Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.licensePriceForm');
        return false;
      }

      // Create a new license price, or update the current instance
      vm.licensePrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-licenses.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
