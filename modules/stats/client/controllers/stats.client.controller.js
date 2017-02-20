(function () {
  'use strict';

  angular
    .module('stats')
    .controller('StatsController', StatsController);

  StatsController.$inject = ['$scope', '$state', '$window', 'statResolve', 'Authentication'];

  function StatsController($scope, $state, $window, stat, Authentication) {
    var vm = this;

    vm.stat = stat;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Stat
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce log?')) {
        vm.stat.$remove(function() {
          $state.go('stats.list');
        });
      }
    }

    // Save Stat
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.statForm');
        return false;
      }

      // Create a new stat, or update the current instance
      vm.stat.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('stats.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
