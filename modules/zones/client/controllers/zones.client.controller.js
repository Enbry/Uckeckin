(function () {
  'use strict';

  angular
  .module('zones')
  .controller('ZonesController', ZonesController);

  ZonesController.$inject = ['$scope', '$state', '$window', 'AreasService', 'zoneResolve', 'Authentication'];

  function ZonesController($scope, $state, $window, AreasService, zone, Authentication) {
    var vm = this;

    vm.zone = zone;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Get User's Zones List
    AreasService.query(function (datas) {
      vm.areas = datas;
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0;i<datas.length;i++) {
        tObj.push(datas[i].user._id);
      }
      for(var j=0; j<tObj.length; j++){
        if(tObj[j] === vm.authentication.user._id){
          x1 = 1;
        }
        else{
          x1 = 0;
        }
        xObj.push(x1);
      }
      vm.hasArea = xObj.includes(1);
    });

    // Remove existing Zone
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cette zone?')) {
        vm.zone.$remove(function() {
          $state.go('zones.list');
        });
      }
    }

    // Save Zone
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.zoneForm');
        return false;
      }

      // Create a new zone, or update the current instance
      vm.zone.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('zones.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
