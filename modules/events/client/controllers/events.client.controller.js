(function () {
  'use strict';

  angular
  .module('events')
  .value('froalaConfig', {
    toolbarInline: false,
    placeholderText: 'Saisir le contenu du gain'
  })
  .controller('EventsController', EventsController);

  EventsController.$inject = ['$scope', '$state', '$window', '$timeout', 'evtResolve', 'SignalsService', 'Authentication', 'NgMap'];

  function EventsController($scope, $state, $window, $timeout, evt, SignalsService, Authentication, NgMap) {
    var vm = this;
    vm.evt = evt;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    /* Images Uploader */

    $scope.files = [];

    $scope.onSuccess = function (Blob){
      $scope.files.push(Blob);
      console.log(Blob.url);
      $scope.$apply();
    };

  //  $scope.files.url = vm.eventPicture;
    console.log($scope.files);

    /* Wysiwyg */
    $scope.titleOptions = {
      placeholderText: 'Add a Title',
      charCounterCount: false,
      toolbarInline: true,
      events: {
        'froalaEditor.initialized': function() {
          console.log('initialized');
        }
      }
    };

    /* Datepicker */
    vm.evt.eventStartDate = new Date();
    vm.evt.eventEndDate = new Date();
    vm.evt.eventPublishStartDate = new Date();
    vm.evt.eventPublishEndDate = new Date();

    //$scope.today();
    $scope.clear = function() {
      vm.evt.eventStartDate = null;
      vm.evt.eventEndDate = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks:'false',
      showButtonBar: 'false',
      dateDisabled: disabled
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
      var date = data.date,
      mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.showButtonBar = false;

    $scope.setDate = function(year, month, day) {
      vm.evt.eventEndDate = new Date(year, month, day);
      vm.evt.eventStartDate = new Date(year, month, day);
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
      mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

    // Add Place address
    vm.placeChanged = function() {
      vm.place = this.getPlace();
      vm.evt.eventLat = vm.place.geometry.location.lat();
      vm.evt.eventLng = vm.place.geometry.location.lng();
      vm.map.setCenter(vm.place.geometry.location);
    };
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    SignalsService.query(function (datas) {
      vm.eventSignals = datas;
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
      vm.hasSignal = xObj.includes(1);
    });

    // Remove existing Event
    function remove() {
      if ($window.confirm('Êtes-vous sur de vouloir supprimer cet événement?')) {
        vm.evt.$remove(function() {
          $state.go('events.list');
        });
      }
    }

    // Save Event
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.evtForm');
        return false;
      }

      // Create a new event, or update the current instance
      vm.evt.createOrUpdate()
      .then(successCallback)
      .catch(errorCallback);

      function successCallback(res) {
        $state.go('events.list');
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
