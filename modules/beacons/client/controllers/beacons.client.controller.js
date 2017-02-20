(function () {
  'use strict';

  angular
    .module('beacons')
    .controller('BeaconsController', BeaconsController);

  BeaconsController.$inject = ['$scope', '$state', '$window', 'beaconResolve', 'LicensesService', 'SignalsService', 'Authentication'];

  function BeaconsController($scope, $state, $window, beacon, LicensesService, SignalsService, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    LicensesService.query(function (datas) {
      vm.beaconLicenses = datas;
      console.log(datas);
    });

    SignalsService.query(function (datas) {
      vm.beaconSignals = datas;
      console.log(datas);
    });

    // Remove existing Beacon
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce beacon?')) {
        vm.beacon.$remove(function() {
          $state.go('beacons.list');
        });
      }
    }

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
        $state.go('beacons.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
