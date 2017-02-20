(function () {
  'use strict';

  angular
  .module('beacons.admin')
  .controller('BeaconsAdminListController', BeaconsAdminListController);

BeaconsAdminListController.$inject = ['$scope', '$window', '$state', '$filter', 'beaconResolve', 'Authentication', 'BeaconsService'];

function BeaconsAdminListController($scope, $window, $state, $filter, beacon, Authentication, BeaconsService) {
  var vm = this;
  vm.buildPager = buildPager;
  vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
  vm.pageChanged = pageChanged;
  vm.beacon = beacon;

  $scope.today = function() {
    vm.beacon.recDate = new Date();
  };
  $scope.today();
  $scope.clear = function() {
    $scope.dt = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks:'false'
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

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];

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

  vm.authentication = Authentication;

  BeaconsService.query(function (data) {
    vm.beacons = data;
    vm.buildPager();
  });

  function buildPager() {
    vm.pagedItems = [];
    vm.itemsPerPage = 8;
    vm.currentPage = 1;
    vm.figureOutItemsToDisplay();
  }

  function figureOutItemsToDisplay() {
    vm.filteredItems = $filter('filter')(vm.beacons, {
      $: vm.search
    });
    vm.filterLength = vm.filteredItems.length;
    var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
    var end = begin + vm.itemsPerPage;
    vm.pagedItems = vm.filteredItems.slice(begin, end);
  }

  function pageChanged() {
    vm.figureOutItemsToDisplay();
  }

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
