(function () {
  'use strict';

  angular
    .module('prices-beacons.admin')
    .controller('BeaconsPricesAdminController', BeaconsPricesAdminController);

  BeaconsPricesAdminController.$inject = ['$scope', '$state', '$window', 'beaconPriceResolve', 'Authentication'];

  function BeaconsPricesAdminController($scope, $state, $window, beaconPrice, Authentication) {
    var vm = this;

    vm.beaconPrice = beaconPrice;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Beacon Price
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce prix?')) {
        vm.beaconPrice.$remove(function() {
          $state.go('admin.prices-beacons.list');
        });
      }
    }

    // Save Beacon Price
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconPriceForm');
        return false;
      }

      // Create a new beacon price, or update the current instance
      vm.beaconPrice.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.prices-beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
