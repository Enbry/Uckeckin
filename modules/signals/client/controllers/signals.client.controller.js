(function () {
  'use strict';

  angular
  .module('signals')
  .controller('SignalsController', SignalsController, ['ngAudio']);

  SignalsController.$inject = ['$scope', '$state', '$window', 'signalResolve', 'SignalsService', 'BeaconsService', 'LicensesService', 'Authentication', 'ngAudio'];

  function SignalsController($scope, $state, $window, signal, SignalsService, BeaconsService, LicensesService, Authentication, ngAudio) {
    var vm = this;

    vm.signal = signal;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    SignalsService.query(function (datas) {
      vm.signals = datas;
    });

    BeaconsService.query(function (datas) {
      vm.signalBeacons = datas;
      var tObj = [];
      var xObj = [];
      var x1;

      if (datas){

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
      }
    });

    LicensesService.query(function (datas){
      vm.signalLicenses = datas;
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
      vm.hasLicense = xObj.includes(1);
    });

    /* Signal Audio Player */

    /*$scope.audioC1 = ngAudio.load('modules/signals/client/sounds/C1-' + vm.signal.signalCode + '.wav');
    $scope.audioC1.volume = 0.1;

    $scope.audioC2 = ngAudio.load('modules/signals/client/sounds/C2-' + vm.signal.signalCode + '.wav');
    $scope.audioC2.volume = 0.1;

    $scope.audioC3 = ngAudio.load('modules/signals/client/sounds/C3-' + vm.signal.signalCode + '.wav');
    $scope.audioC3.volume = 0.1;

    $scope.audioC4 = ngAudio.load('modules/signals/client/sounds/C4-' + vm.signal.signalCode + '.wav');
    $scope.audioC4.volume = 0.1;*/

    // Remove existing License
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer ce signal?')) {
        vm.signal.$remove(function() {
          $state.go('signals.list');
        });
      }
    }

    // Save License
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.signalForm');
        return false;
      }

      // Create a new license, or update the current instance
      vm.signal.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('signals.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
