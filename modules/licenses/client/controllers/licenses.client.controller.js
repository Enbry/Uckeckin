  (function () {
  'use strict';

  angular
  .module('licenses')
  .controller('LicensesController', LicensesController, ['ngAudio']);

  LicensesController.$inject = ['$scope', '$state', '$window', 'licenseResolve', 'LicensesService', 'AreasService', 'ZonesService', 'SignalsService', 'BeaconsService', 'Authentication', 'NgMap', 'ngAudio'];

  function LicensesController($scope, $state, $window, license, LicensesService, AreasService, ZonesService, SignalsService, BeaconsService, Authentication, NgMap, ngAudio) {
    var vm = this;

    vm.license = license;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    LicensesService.query(function (datas) {
      vm.licences = datas;
      var tObj = [];
      var xObj = [];
      var x1;

      for(var i=0; i<datas.length; i++) {
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
      vm.hasLicense = xObj.includes(1);
      console.log(vm.hasLicense);

    });

    // Get User's Zones List
    ZonesService.query(function (datas) {
      vm.licenseZones = datas;
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

// Get User's Areas List
AreasService.query(function (datas) {
  vm.licenseAreas = datas;
  console.log(datas);
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

SignalsService.query(function (datas) {
  vm.licenseSignals = datas;
  console.log(datas);
});

BeaconsService.query(function (datas){
  vm.licenseBeacons = datas;
  console.log(datas);
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
  vm.hasBeacon = xObj.includes(1);
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

// Save Place
/*function save(isValid) {
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
}*/

$scope.audio = ngAudio.load("modules/licenses/client/sounds/V3-C1-AB586.wav");
$scope.audio.volume = 0.1;

// Remove existing License
function remove() {
  if ($window.confirm('Êtes-vous sur de vouloir supprimer cette licence?')) {
    vm.license.$remove(function() {
      $state.go('licenses.list');
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
    $state.go('licenses.list');
  }

  function errorCallback(res) {
    vm.error = res.data.message;
  }
}
}
}());
