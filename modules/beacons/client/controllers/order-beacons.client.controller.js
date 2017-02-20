(function () {
  'use strict';

  angular
    .module('beacons')
    .controller('BeaconsOrderController', BeaconsOrderController);

  BeaconsOrderController.$inject = ['$scope', '$filter', '$state', '$window', 'beaconResolve', 'BeaconsService', 'BeaconsPricesService', 'Authentication'];

  function BeaconsOrderController($scope, $filter, $state, $window, beacon, BeaconsService, BeaconsPricesService, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    //vm.remove = remove;
    vm.save = save;

    //$window.Stripe.setPublishableKey('pk_test_QFaSkrmXe2W91X7B4aO3P8ZB');

    BeaconsService.query(function (datas) {
      vm.beacons = datas;
    });

    BeaconsPricesService.query(function (data) {
      vm.beaconPrices = data;
    });
    // Save Beacon
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.beaconForm');
        return false;
      }

      // Create a new beacon, or update the current instance
      vm.beacon.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('beacons.order');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }

}());
