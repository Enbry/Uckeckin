(function () {
  'use strict';

  angular
    .module('areas')
    .controller('AreasController', AreasController);

  AreasController.$inject = ['$scope', '$state', '$window', 'ZonesService', 'areaResolve', 'Authentication', 'NgMap'];

  function AreasController($scope, $state, $window, ZonesService, area, Authentication, NgMap) {
    var vm = this;

    vm.area = area;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Get User's Zones List
    ZonesService.query(function (datas) {
      vm.zones = datas;
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
      vm.hasZone = xObj.includes(1);
    });

    // Add Place address
    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.area.placeLat = vm.place.geometry.location.lat();
      vm.area.placeLng = vm.place.geometry.location.lng();
      vm.map.setCenter(vm.place.geometry.location);
    };
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    // Remove existing Place
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce lieu?')) {
        vm.area.$remove(function() {
          $state.go('areas.list');
        });
      }
    }

    // Save Place
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.areaForm');
        return false;
      }

      // Create a new place, or update the current instance
      vm.area.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('areas.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

  }
}());
