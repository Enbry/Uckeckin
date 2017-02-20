(function () {
  'use strict';

  angular
    .module('beacons.admin')
    .controller('BeaconsAdminController', BeaconsAdminController);

  BeaconsAdminController.$inject = ['$scope', '$state', '$window', 'beaconResolve', 'Authentication'];

  function BeaconsAdminController($scope, $state, $window, beacon, Authentication) {
    var vm = this;

    vm.beacon = beacon;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Beacon
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce beacon?')) {
        vm.beacon.$remove(function() {
          $state.go('admin.beacons.list');
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
        $state.go('admin.beacons.list'); 
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
