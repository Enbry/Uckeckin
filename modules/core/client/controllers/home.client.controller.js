(function () {
  'use strict';

  angular
  .module('core')
  .controller('HomeController', HomeController, ['ngAudio']);

  HomeController.$inject = ['$scope', '$state', '$window', 'licenseResolve', 'LicensesService', 'Authentication', 'NgMap', 'ngAudio'];

  function HomeController($scope, $state, $window, license, LicensesService, Authentication, NgMap, ngAudio) {
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

    });

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
